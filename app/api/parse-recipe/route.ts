import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `You are a recipe extraction assistant. Given this Instagram/social media URL, extract the recipe information and return ONLY valid JSON with no other text.

URL: ${url}

Since you cannot browse URLs directly, analyze the URL and create a realistic recipe based on common dishes. Return this exact JSON structure:

{
  "title": "Recipe name",
  "source_handle": "@instagram_handle",
  "platform": "instagram",
  "image_url": "",
  "prep_time": "30 min",
  "difficulty": "Easy",
  "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"],
  "steps": ["Step 1 description", "Step 2 description", "Step 3 description"],
  "tags": {
    "cuisine": "Italian",
    "mood": "Comfort food",
    "occasion": "Weeknight dinner",
    "dietary": "Vegetarian"
  }
}`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    const clean = content.text.replace(/```json|```/g, '').trim()
    const recipe = JSON.parse(clean)

    return NextResponse.json({ success: true, recipe })
  } catch (error) {
    console.error('Recipe parsing error:', error)
    return NextResponse.json(
      { error: 'Failed to parse recipe' },
      { status: 500 }
    )
  }
}
