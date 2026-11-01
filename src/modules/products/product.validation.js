
import { z } from "zod";

const productSchema = z.object({
  sku: z.string().trim().min(1, "SKU is required"),
  name: z.string().trim().min(1, "Product name is required"),
  description: z.string().optional().default(""),

  category: z.enum(["PACKAGED_WATER", "OTHER"]),

  volumeMl: z.number()
    .int("Volume must be an integer")
    .positive("Volume must be greater than zero"),

  containerType: z.enum([
    "RETURNABLE_JAR",
    "BOTTLE",
    "OTHER",
  ]),

  returnable: z.boolean().default(false),
  depositRequired: z.boolean().default(false),

  defaultDepositPaise: z.number()
    .int()
    .nonnegative()
    .default(0),

  defaultPricePaise: z.number()
    .int("Price must be an integer")
    .nonnegative("Price cannot be negative"),

  inventoryTracked: z.boolean().default(true),
  active: z.boolean().default(true),
});

export const createProductSchema = productSchema;

export const updateProductSchema = productSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided"
  );
