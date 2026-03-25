import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// In-memory rate limit: max 20 recipe parses per user per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(userId: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(userId)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

function isValidRecipeUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    const allowed = [
      'www.instagram.com', 'instagram.com',
      'www.tiktok.com', 'tiktok.com', 'vm.tiktok.com',
    ]
    return allowed.includes(parsed.hostname) && ['https:', 'http:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

async function fetchPostMeta(url: string): Promise<{ caption: string }> {
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
    return {
      caption: captionMatch?.[1] || captionMatch2?.[1] || '',
    }
  } catch {
    return { caption: '' }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Auth check — reject unauthenticated requests
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limit — prevent runaway API costs
    if (isRateLimited(user.id)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { url } = await request.json()
    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 })

    // URL validation — only allow Instagram and TikTok URLs (prevents SSRF)
    if (!isValidRecipeUrl(url)) {
      return NextResponse.json(
        { error: 'Only Instagram and TikTok URLs are supported' },
        { status: 400 }
      )
    }

    const { caption } = await fetchPostMeta(url)

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `You are a recipe extraction assistant. Extract and structure a recipe from this social media post.

URL: ${url}
${caption ? `Post caption: ${caption}` : 'No caption available — infer from URL.'}

Based on the caption and URL, extract or create a realistic recipe. Return ONLY valid JSON with no markdown or backticks:

{
  "title": "Recipe name",
  "source_handle": "@handle_from_url_or_caption",
  "platform": "${url.includes('tiktok.com') ? 'tiktok' : 'instagram'}",
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
    return NextResponse.json({ success: true, recipe })
  } catch (error: any) {
    console.error('Recipe parsing error:', error)
    const message = error?.status === 401
      ? 'API key is invalid or missing. Please check your Anthropic API key.'
      : error?.status === 429
      ? 'AI rate limit reached. Please try again in a minute.'
      : 'Failed to parse recipe'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
