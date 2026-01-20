import { Injectable } from "@nestjs/common";
import { TicketsRepository } from "./tickets.repository.js";
import { CreateTicketDto } from "./dto/createTicket.dto.js";
import { Ticket } from "../generated/prisma/client.js";
import { UpdateTicketDto } from "./dto/updateTicket.dto.js";
import { EventsGateway } from "../events/events.gateway.js";

@Injectable()
export class TicketsService {

    constructor(
        private ticketsRepository: TicketsRepository,
        private eventsGateway: EventsGateway,
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

        // Create ticket
        const ticket: Ticket = await this.ticketsRepository.create({
            data,
            include: {
                assignee: {
                    select: {
                        username: true
                    }
                }
            }
        })

        // Emit event
        this.eventsGateway.emitTicketCreated(ticket)

        return ticket
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
        
        // Update ticket
        const ticket: Ticket = await this.ticketsRepository.update({
            where: {
                id: Number(id)
            },
            data: {
                lane: {
                    connect: {
                        id: updateTicketDto.laneId
                    }
                }
            },
            include: {
                assignee: {
                    select: {
                        username: true
                    }
                }
            }
        })

        // Emit event
        this.eventsGateway.emitTicketUpdated(ticket)

        return ticket
    }
}