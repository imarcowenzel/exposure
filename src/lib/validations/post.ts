import { z } from "zod";

export const searchFormSchema = z.object({
  query: z.string().min(1),
});

export const editPostSchema = z.object({
  tags: z.string(),
});
