import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository.js";
import { User } from '../generated/prisma/client.js'

@Injectable()
export class UsersService {

    constructor(
        private usersRepository: UsersRepository
    ){}

    public async getById (
        id: number
    ): Promise<User | null> {
        return await this.usersRepository.getById(id)
    }

    public async getByUsername(
        username: string
    ): Promise<User | null> {
        return await this.usersRepository.getByUsername(username)
    }

    public async get (
        filter: {}
    ): Promise<User[]> {
        return await this.usersRepository.get(filter)
    }
}