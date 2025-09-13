import { z } from "zod";

const createServiceValidationSchema = z.object({
  body: z.object({
    category: z.string({ required_error: "Category is required" }),
    country: z.string({ required_error: "Country is required" }),
    visa: z.string({ required_error: "Visa name is required" }),
    price: z.number({ required_error: "Price is required" }),
    extra: z.number({ required_error: "Price is required" }),
  }),
});

export const ServiceValidations = {
  createServiceValidationSchema,
};
