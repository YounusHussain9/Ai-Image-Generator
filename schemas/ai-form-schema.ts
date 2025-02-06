"use client";

import { z } from "zod";

export const aiFormSchema = z.object({
  prompt: z.string().min(2, {
    message: "Prompt must be at least 2 characters.",
  }),
});
