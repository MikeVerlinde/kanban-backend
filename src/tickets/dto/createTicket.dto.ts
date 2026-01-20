import z from "zod";
import { TicketPriority } from "../../generated/prisma/client.js";

export const createTicketSchema = z.strictObject({
    title: z.string(),
    description: z.string(),
    priority: z.enum(TicketPriority),
    laneId: z.int(),
    assigneeUserId: z.int().nullable()
})

export type CreateTicketDto = z.infer<typeof createTicketSchema>