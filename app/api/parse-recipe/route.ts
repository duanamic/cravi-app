import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 })

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `You are a recipe extraction assistant. A user saved this Instagram recipe URL: ${url}

Based on the URL path and any identifiable clues, invent a realistic and UNIQUE recipe that could plausibly come from that post. Every URL must produce a DIFFERENT recipe — vary the cuisine, ingredients, and style each time.

Return ONLY valid JSON with no markdown, no preamble, no backticks:

{
  "title": "Recipe name",
  "source_handle": "@instagram_handle_from_url",
  "platform": "instagram",
  "prep_time": "X min",
  "difficulty": "Easy|Medium|Hard",
  "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3", "ingredient 4", "ingredient 5"],
  "steps": ["Step 1", "Step 2", "Step 3"],
  "tags": {
    "cuisine": "e.g. Italian / Thai / Mexican / Mediterranean",
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
  } catch (error) {
    console.error('Recipe parsing error:', error)
    return NextResponse.json({ error: 'Failed to parse recipe' }, { status: 500 })
  }
}
