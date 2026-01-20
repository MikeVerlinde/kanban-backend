import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { Prisma, Ticket } from "../generated/prisma/client.js";

@Injectable()
export class TicketsRepository {

    constructor(
        private prisma: PrismaService
    ){}

    public async create (
        args: Prisma.TicketCreateArgs
    ): Promise<Ticket> {
        return await this.prisma.ticket.create(args)
    }

    public async get(
        args: Prisma.TicketFindManyArgs
    ): Promise<Ticket[]> {
        return await this.prisma.ticket.findMany(args)
    }

    public async update(
        args: Prisma.TicketUpdateArgs
    ): Promise<Ticket> {

        return await this.prisma.ticket.update(args)
    }
}