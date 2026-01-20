import z from "zod";

export const createLaneSchema = z.strictObject({
    name: z.string(),
})

export type CreateLaneDto = z.infer<typeof createLaneSchema>