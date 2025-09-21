import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().nonempty("Name is required").min(2, "Name must be at least 2 characters long").max(20, "Name must be at most 20 characters long"),
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
    rePassword: z.string().nonempty("Password is required"),
    phone: z
        .string()
        .regex(/^01[0125][0-9]{8}$/, "Invalid phone number")
        .nonempty("Phone number is required"),
})
    .refine((data) => data.password === data.rePassword, {
        path: ["rePassword"],
        error: "Passwords do not match",
    });

export type RegisterType = z.infer<typeof registerSchema>;
