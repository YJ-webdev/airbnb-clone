import { z } from "zod";

export const categorySchema = z.object({
  category: z.string().min(1, "Category is required"),
});

export const floorPlanSchema = z.object({
  guest: z.number().min(1, "Guests is required"),
  bedroom: z.number(),
  bathroom: z.number().min(1, "Bathrooms is required"),
  bed: z.number().min(1, "Bed is required"),
});

export const locationSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string(),
  city: z.string(),
  location: z.string().min(1, "Location is required"),
  latitude: z.number().min(1, "Latitude is required"),
  longitude: z.number().min(1, "Longitude is required"),
});

export const photosSchema = z.object({
  images: z.array(z.string().min(5, "Minimun 5 images are required")),
});

export const descriptionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export const priceSchema = z.object({
  price: z.coerce.number().min(10, "Price is required"),
});

export const becomeHostSchema = z.object({
  ...categorySchema.shape,
  ...floorPlanSchema.shape,
  ...locationSchema.shape,
  ...photosSchema.shape,
  ...descriptionSchema.shape,
  ...priceSchema.shape,
});

export type BecomeAHost = z.infer<typeof becomeHostSchema>;
