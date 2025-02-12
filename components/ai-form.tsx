"use client";
import { aiFormSchema } from "@/schemas/ai-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { ModeToggle } from "@/app/components/mode-toggle/ModeToggle";
import { Textarea } from "./ui/textarea";
import PromptTooltip from "@/app/components/prompt-tooltip/PromptTooltip";
import ImageShimmer from "@/app/components/image-shimmer";
import { PromptGuideModal } from "@/app/components/prompt-guide-modal";

const prompts = [
  "A futuristic city under a neon sky...",
  "A medieval castle floating in the sky...",
  "An enchanted forest glowing with magical creatures...",
  "A cyberpunk warrior in a digital realm...",
  "A robot artist painting a masterpiece...",
];

const realisticPrompts = [
  "A candid portrait of an elderly man with deep wrinkles, wearing a wool coat, standing in a foggy European street.",
  "A breathtaking mountain range covered in snow, with golden light from the setting sun illuminating the peaks.",
  "A bustling New York street at night, neon signs reflecting off the wet pavement as people walk with umbrellas.",
  "A steaming cup of coffee with intricate latte art, placed on a wooden table near a window with raindrops outside.",
  "A majestic lion standing on a rocky ledge, its golden mane blowing in the wind, with the savanna stretching behind.",
];

const AiForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState(prompts[0]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof aiFormSchema>>({
    resolver: zodResolver(aiFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(prompts[Math.floor(Math.random() * prompts.length)]);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  console.log(selectedModel);
  const onSubmit = async (data: { prompt: string }) => {
    setLoading(true);
    setError(null); // Reset error before new request

    try {
      const response = await fetch("/api/ai-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: data.prompt, model: selectedModel }),
      });

      const dataResponse = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: dataResponse.error || "Something went wrong.",
        });
      } else {
        setImageUrl(dataResponse.imageUrl);
        form.reset();
        setSelectedModel("");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setImageUrl(null);
  };

  return (
    <div className="flex flex-col mt-5 items-center min-h-screen">
      <div className="flex justify-end w-full pr-8">
        <ModeToggle />
      </div>
      <div className="w-full flex flex-col items-center justify-center px-4">
        <div className="w-full md:w-[500px]">
          <div className="text-center my-5">
            <h3 className="text-2xl font-bold ">MindCanvas</h3>
            <p className="text-[#5e5e5e] font-normal">
              Your thoughts turned into digital art
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col md:flex-row gap-4 items-center justify-center"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormControl>
                      <Textarea
                        placeholder={placeholder}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                        className="w-full h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="!m-0 w-[120px]  !font-medium"
                disabled={loading}
              >
                Generate
              </Button>
            </form>
          </Form>
          <div className="my-2 flex justify-center items-center">
            <h3 className="text-sm font-semibold py-2 text-center">
              Select Models
            </h3>
            <label className="ml-4 cursor-pointer flex items-center">
              <input
                type="radio"
                hidden
                name="model"
                checked={selectedModel === "general"}
                onChange={() => handleModelChange("general")}
              />
              <span
                className={`ml-2 p-1.5 text-xs rounded transition-all duration-300 ease-in-out ${
                  selectedModel === "general"
                    ? "font-semibold bg-black text-white scale-105"
                    : "bg-gray-200 text-black scale-100"
                }`}
              >
                General
              </span>
            </label>{" "}
            <label className="ml-4 cursor-pointer flex items-center">
              <input
                type="radio"
                hidden
                name="model"
                checked={selectedModel === "dall-e-2"}
                onChange={() => handleModelChange("dall-e-2")}
              />
              <span
                className={`ml-2 p-1.5 text-xs rounded transition-all duration-300 ease-in-out ${
                  selectedModel === "dall-e-2"
                    ? "font-semibold bg-black text-white scale-105"
                    : "bg-gray-200 text-black scale-100"
                }`}
              >
                Dall-e-2
              </span>
            </label>
            <label className="ml-4 cursor-pointer flex items-center">
              <input
                type="radio"
                hidden
                name="model"
                checked={selectedModel === "dall-e-3"}
                onChange={() => handleModelChange("dall-e-3")}
              />
              <span
                className={`ml-2 p-1.5 text-xs rounded transition-all duration-300 ease-in-out ${
                  selectedModel === "dall-e-3"
                    ? "font-semibold bg-black text-white scale-105"
                    : "bg-gray-200 text-black scale-100"
                }`}
              >
                Dall-e-3
              </span>
            </label>{" "}
          </div>
        </div>
        <div className="">
          <h3 className="text-sm font-semibold py-2 text-center">
            Example Prompts
          </h3>
          <div className="flex gap-4  flex-wrap items-center justify-center">
            {realisticPrompts.map((prompt, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-800 text-sm whitespace-nowrap p-2 rounded-xl text-black dark:text-white"
              >
                <PromptTooltip prompt={prompt}>
                  <div
                    onClick={() => form.setValue("prompt", prompt)}
                    className="cursor-pointer"
                  >
                    {prompt.slice(0, 20)}
                  </div>
                </PromptTooltip>
              </div>
            ))}
          </div>
        </div>
        <PromptGuideModal />
        {loading ? (
          <ImageShimmer />
        ) : (
          imageUrl && (
            <div className="border h-[300px] w-[300px] mt-4 rounded-md overflow-hidden">
              <Image
                src={imageUrl}
                alt="AI Generated Image"
                width={256}
                height={256}
                style={{ maxWidth: "100%" }}
                className="!w-full !h-full  object-center"
                unoptimized
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AiForm;
