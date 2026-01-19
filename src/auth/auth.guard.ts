import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthenticatedUser, authenticatedUserSchema } from "./dto/authCookie.dto.js";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(){}

    public async canActivate(
        context: ExecutionContext
    ): Promise<boolean>  {

        // Extract token from request
        const request = context.switchToHttp().getRequest()
        const authCookie: AuthenticatedUser | undefined = request.signedCookies['auth']

        // If no auth cookie
        if (!authCookie) {
            throw new UnauthorizedException('User not authorized')
        }

        // Parse cookie
        try {
            authenticatedUserSchema.parse(authCookie)
        } catch {
            throw new UnauthorizedException('Invalid auth cookie')
        }

        // Attach raw payload to request
        request['user'] = authCookie

        return true
    }
}