import z from "zod";

export const loginSchema = z.strictObject({
    username: z.string(),
    password: z.string(),
})

export type LoginDto = z.infer<typeof loginSchema>