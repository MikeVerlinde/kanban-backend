import { Module } from "@nestjs/common";
import { TicketsController } from "./tickets.controller.js";
import { TicketsService } from "./tickets.service.js";
import { TicketsRepository } from "./tickets.repository.js";

@Module({
    controllers: [TicketsController],
    providers: [TicketsService, TicketsRepository]
})
export class TicketsModule {}