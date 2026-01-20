import { Controller, Get, UseGuards } from "@nestjs/common"
import { UsersService } from "./users.service.js"
import { AuthGuard } from "../auth/auth.guard.js"
import { User } from "../generated/prisma/client.js"
import { toUserDto, UserDto } from "./dto/user.dto.js"

@Controller('/users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ){}

    @Get()
    @UseGuards(AuthGuard)
    public async get() {

        const users: User[] = await this.usersService.get({})
        const dtos: UserDto[] = users.map(u => toUserDto(u))

        return {
            users: dtos
        }
    }
}