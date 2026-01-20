import z from "zod";

export const updateTicketSchema = z.strictObject({
    laneId: z.int()
})

export type UpdateTicketDto = z.infer<typeof updateTicketSchema>