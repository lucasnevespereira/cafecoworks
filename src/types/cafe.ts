import { z } from "zod";

export const CafeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(50).max(500),
  city: z.string().min(1),
  country: z.string().min(1),
  address: z.string(),
  website: z.url().optional(),
  image: z.string().startsWith('/images/'),
  tags: z.array(z.string()).min(1),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  station: z.string().optional(),
  featured: z.boolean().optional(),
});

export type Cafe = z.infer<typeof CafeSchema>;
