import { Injectable } from "@nestjs/common";
import { User } from '../generated/prisma/client.js'
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class UsersRepository {

    constructor(
        private prisma: PrismaService
    ){}
    
    public async getById (
        id: number
    ): Promise<User | null> {

        return await this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    public async getByUsername (
        username: string
    ): Promise<User | null> {

        return await this.prisma.user.findUnique({
            where: {
                username
            }
        })
    }
}