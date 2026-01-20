import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes } from "@nestjs/common";
import { TicketsService } from "./tickets.service.js";
import { ZodValidationPipe } from "../common/pipes/zod.pipe.js";
import { type CreateTicketDto, createTicketSchema } from "./dto/createTicket.dto.js";
import { AuthGuard } from "../auth/auth.guard.js";
import { Ticket } from "../generated/prisma/client.js";
import { type UpdateTicketDto, updateTicketSchema } from "./dto/updateTicket.dto.js";

@Controller('/tickets')
export class TicketsController {

    constructor(
        private ticketsService: TicketsService
    ){}

    @Post()
    @UsePipes(new ZodValidationPipe(createTicketSchema))
    @UseGuards(AuthGuard)
    public async create (
        @Body() createTicketDto: CreateTicketDto
    ) {

        const ticket: Ticket = await this.ticketsService.create(createTicketDto)

        return {
            ticket
        }
    }

    @Get()
    @UseGuards(AuthGuard)
    public async get () {

        const tickets: Ticket[] = await this.ticketsService.get({})
        return {
            tickets
        }
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    public async patch (
        @Param('id') id: string,
        @Body(new ZodValidationPipe(updateTicketSchema)) updateTicketDto: UpdateTicketDto
    ) {
        const ticket: Ticket = await this.ticketsService.update(
            id, 
            updateTicketDto
        )

        return {
            ticket
        }
    }
}