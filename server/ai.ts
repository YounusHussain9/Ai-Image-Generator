"use server";
import { openai } from "@ai-sdk/openai";
import { experimental_generateImage as generateImage } from "ai";

export async function getAiResponse(
  prompt: string = "Santa Claus driving a Cadillac"
) {
  try {
    const { image } = await generateImage({
      model: openai.image("dall-e-3"),

      prompt,
      // size: "512x512",
      aspectRatio: "1:1",
    });
    console.log(image);
    return image.base64 || null;
  } catch (error) {
    console.log(error);
    return error;
  }
}
