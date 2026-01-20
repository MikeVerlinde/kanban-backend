import { Injectable } from "@nestjs/common";
import { TicketsRepository } from "./tickets.repository.js";
import { CreateTicketDto } from "./dto/createTicket.dto.js";
import { Ticket } from "../generated/prisma/client.js";
import { UpdateTicketDto } from "./dto/updateTicket.dto.js";

@Injectable()
export class TicketsService {

    constructor(
        private ticketsRepository: TicketsRepository
    ){}

    public async create (
        createTicketDto: CreateTicketDto
    ): Promise<Ticket> {

        let data = {
            title: createTicketDto.title,
            description: createTicketDto.description,
            createdAt: new Date(),
            priority: createTicketDto.priority,
            lane: {
                connect: {
                    id: createTicketDto.laneId
                }
            }
        }

        if (createTicketDto.assigneeUserId) {
            data['assignee'] = {
                connect: {
                    id: createTicketDto.assigneeUserId ?? undefined
                }
            }
        }

        return await this.ticketsRepository.create({
            data
        })
    }

    public async get (
        filter: {}
    ): Promise<Ticket[]> {
        return await this.ticketsRepository.get({
            ...filter,
            include: {
                assignee: {
                    select: {
                        username: true
                    }
                }
            }
        })
    }

    public async update (
        id: string,
        updateTicketDto: UpdateTicketDto
    ): Promise<Ticket> {
        return await this.ticketsRepository.update({
            where: {
                id: Number(id)
            },
            data: {
                lane: {
                    connect: {
                        id: updateTicketDto.laneId
                    }
                }
            }
        })
    }
}