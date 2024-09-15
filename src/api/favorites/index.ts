import { z } from "zod";

export const favoriteSchema = z.object({
  name: z.string(),
});
