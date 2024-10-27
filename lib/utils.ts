import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(20, { message: "First name must be max 20 characters long" }),
  lastName: z
    .string()
    .max(20, { message: "First name must be max 20 characters long" })
    .optional(),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
});
