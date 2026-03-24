import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function fetchInstagramMeta(url: string): Promise<{ caption: string; imageUrl: string }> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    })
    const html = await res.text()
    const captionMatch = html.match(/<meta property="og:description" content="([^"]+)"/)
    const captionMatch2 = html.match(/<meta name="twitter:description" content="([^"]+)"/)
    const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/)
    return {
      caption: captionMatch?.[1] || captionMatch2?.[1] || '',
      imageUrl: imageMatch?.[1] || '',
    }
  } catch {
    return { caption: '', imageUrl: '' }
  }
}

async function uploadImageToStorage(imageUrl: string): Promise<string> {
  try {
    const res = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
        'Referer': 'https://www.instagram.com/',
      },
    })
    if (!res.ok) return ''
    const buffer = await res.arrayBuffer()
    const filename = `recipe-${Date.now()}.jpg`
    const { error } = await supabase.storage
      .from('recipe-images')
      .upload(filename, buffer, { contentType: 'image/jpeg', upsert: false })
    if (error) return ''
    const { data } = supabase.storage.from('recipe-images').getPublicUrl(filename)
    return data.publicUrl
  } catch {
    return ''
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 })

    const { caption, imageUrl } = await fetchInstagramMeta(url)

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `You are a recipe extraction assistant. Extract and structure a recipe from this Instagram post.

URL: ${url}
${caption ? `Post caption: ${caption}` : 'No caption available — infer from URL.'}

Based on the caption and URL, extract or create a realistic recipe. Return ONLY valid JSON with no markdown or backticks:

{
  "title": "Recipe name",
  "source_handle": "@handle_from_url_or_caption",
  "platform": "instagram",
  "prep_time": "X min",
  "difficulty": "Easy|Medium|Hard",
  "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3", "ingredient 4", "ingredient 5"],
  "steps": ["Step 1", "Step 2", "Step 3"],
  "tags": {
    "cuisine": "e.g. Indonesian / Italian / Mexican",
    "mood": "e.g. Comfort food / Light / Indulgent",
    "occasion": "e.g. Weeknight dinner / Date night / Weekend brunch",
    "time": "e.g. Under 30 min / 30-45 min / 1 hour+"
  }
}`
      }]
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')
    const clean = content.text.replace(/```json|```/g, '').trim()
    const recipe = JSON.parse(clean)

    const storedImageUrl = imageUrl ? await uploadImageToStorage(imageUrl) : ''

    return NextResponse.json({ success: true, recipe: { ...recipe, image_url: storedImageUrl } })
  } catch (error) {
    console.error('Recipe parsing error:', error)
    return NextResponse.json({ error: 'Failed to parse recipe' }, { status: 500 })
  }
}
