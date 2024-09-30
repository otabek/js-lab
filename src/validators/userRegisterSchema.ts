import { z } from "zod";

export const userRegisterSchema = z
    .object({
        firstName: z
            .string()
            .min(2, "First name must be at least 2 characters long")
            .max(100, "First name cannot exceed 100 characters"),
        lastName: z
            .string()
            .min(1, "Last name must be at least 1 character long")
            .max(100, "Last name cannot exceed 100 characters"),
        email: z.string().email("Please enter a valid email address.")
    })
    .required();

export type UserRegisterForm = z.infer<typeof userRegisterSchema>;
