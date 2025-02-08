import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt } = body;
  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512", // Reduced size
    });

    const imageUrl = response.data[0].url;
    return NextResponse.json({ imageUrl });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate image",  });
  }
}
