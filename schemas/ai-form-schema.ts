"use client";

import { z } from "zod";

export const aiFormSchema = z.object({
  prompt: z.string().min(2, {
    message: "Prompt required",
  }),
});
