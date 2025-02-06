"use client";
import { aiFormSchema } from "@/schemas/ai-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getAiResponse } from "@/server/ai";
import Image from "next/image";

const AiForm = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof aiFormSchema>>({
    resolver: zodResolver(aiFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (data: { prompt: string }) => {
    setLoading(true); // Set loading to true when submission starts
    const response = await fetch("/api/ai-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: data.prompt, // Use the prompt from the form
      }),
    });

    const dataResponse = await response.json();
    setImageUrl(dataResponse.imageUrl); // Update the image URL

    setLoading(false); // Set loading to false when the image is ready
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div>
        <div className="w-[400px]">
          <div className="text-center my-5">
            <p>Create an image from text prompt</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex gap-4"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Enter your prompt"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="!m-0" disabled={loading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>

        {loading ? (
          <div className="text-center mt-8">Generating image...</div>
        ) : (
            imageUrl && (
            <div className="border h-[300px] w-full mt-8 rounded-md overflow-hidden">
              <Image
                src={imageUrl}
                alt="AI Generated Image"
                width={256}
                height={256}
                style={{ maxWidth: "100%" }}
                className="!w-full !h-full  object-center"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AiForm;
