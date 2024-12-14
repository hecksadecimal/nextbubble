import { z } from "zod";

export const registrationSchema = z.object({
    username: z.string().min(3).max(32, { message: "Username must be between 3 and 32 characters" }),
    password: z.string().min(8).max(128, { message: "Password must be between 8 and 128 characters" }),
    passwordConfirm: z.string().min(8).max(128, { message: "Password must be between 8 and 128 characters" }),
        dateOfBirth: z.coerce.date().refine((date) => date.getTime() < Date.now(), { message: "Date of Birth must be in the past" })
                                    .refine((date) => Date.now() - date.getTime() < 100 * 365.25 * 24 * 60 * 60 * 1000, { message: "Date of Birth must be less than 100 years ago" })
                                    .refine((date) => Date.now() - date.getTime() >= 18 * 365.25 * 24 * 60 * 60 * 1000, { message: "Date of Birth must be at least 18 years ago" }),
}).superRefine(({password, passwordConfirm}, ctx) => {
    if (password !== passwordConfirm) {
        ctx.addIssue({ code: "custom", path: ["passwordConfirm"], message: "Passwords do not match" });
    }
});