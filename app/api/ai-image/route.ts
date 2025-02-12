import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, model } = body;

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt cannot be empty." },
        { status: 400 }
      );
    }

    // Only include the model key if a specific model is selected
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestPayload: any = {
      prompt,
      n: 1,
      // size: "512x512",
    };

    if (model && model !== "general") {
      requestPayload.model = model; // Only add `model` if it's not "general"
    }

    const response = await openai.images.generate(requestPayload);

    if (!response.data || response.data.length === 0) {
      return NextResponse.json(
        { error: "No image generated. Try another prompt." },
        { status: 500 }
      );
    }

    const imageUrl = response.data[0].url;
    return NextResponse.json({ imageUrl });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Image Generation Error:", error);

    let errorMessage = "Failed to generate image. Please try again.";
    if (error.response) {
      console.error("OpenAI Error Response:", error.response.data);
      errorMessage =
        error.response.data.error?.message || "OpenAI service error.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
