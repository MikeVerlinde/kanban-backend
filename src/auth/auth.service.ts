import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import * as argon2 from "argon2";
import { User } from "../generated/prisma/client.js";
import { UsersService } from "../users/users.service.js";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
    ){}

    public async login (
        username: string,
        password: string
    ): Promise<User> {

        // Get user
        const user: User | null = await this.usersService.getByUsername(username)

        // If user not found
        if (!user) {
            throw new UnauthorizedException('User not authorized')
        }

        // Verify password
        let isValid: boolean = false
        try {
            isValid = await argon2.verify(user.password, password)
        } catch (e) {
            throw new InternalServerErrorException('Failed to verify password')
        }

        if (!isValid) {
            throw new UnauthorizedException('User not authorized')
        }

        // Return authenticated user
        return user
    }
}