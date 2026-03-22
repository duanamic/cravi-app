import { anthropic } from "./anthropic";
import { Recipe } from "@/types";

export async function parseRecipeFromUrl(url: string): Promise<Partial<Recipe>> {
  const message = await anthropic.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Extract recipe information from this URL: ${url}

Return a JSON object with these fields:
- title: string
- ingredients: string[] (list of ingredients)
- steps: string[] (cooking steps)
- tags: string[] (cuisine type, meal type, dietary info)
- prep_time: string (e.g. "30 mins")
- image_url: string (if available)
- platform: "instagram" | "tiktok" | "other"

Only return valid JSON, no other text.`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");

  return JSON.parse(content.text);
}
