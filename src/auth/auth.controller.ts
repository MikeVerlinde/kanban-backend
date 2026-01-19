import { Body, Controller, Post, Res, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { ZodValidationPipe } from "../../src/common/pipes/zod.pipe.js";
import { type LoginDto, loginSchema } from "./dto/login.dto.js";
import { type Response } from "express";
import { User } from "../../src/generated/prisma/client.js";
import { authenticatedUserSchema } from "./dto/authCookie.dto.js";

@Controller('/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('/login')
    @UsePipes(new ZodValidationPipe(loginSchema))
    public async login (
        @Body() loginDto: LoginDto,
        @Res() response: Response,
    ) {

        // Authenticated
        const authenticatedUser: User = await this.authService.login(
            loginDto.username, 
            loginDto.password
        )

        // Set cookie
        response.cookie(
            'auth', 
            authenticatedUserSchema.parse({
                userId: authenticatedUser.id
            }),
            {
                signed: true,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            }
        )
        
        // Response
        return response.json({
            message: 'OK'
        })
    }
}