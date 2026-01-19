import z from "zod";

export const authenticatedUserSchema = z.strictObject({
    userId: z.int(),
})

export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>