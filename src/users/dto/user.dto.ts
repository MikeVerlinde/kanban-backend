import z from "zod";
import { User } from "../../generated/prisma/client.js";

export const userSchema = z.strictObject({
    id: z.int(),
    username: z.string()
})

export type UserDto = z.infer<typeof userSchema>

export const toUserDto = (user: User): UserDto => {
    return {
        id: user.id,
        username: user.username
    }
}