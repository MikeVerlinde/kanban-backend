import { Module } from "@nestjs/common";
import { TicketsController } from "./tickets.controller.js";
import { TicketsService } from "./tickets.service.js";
import { TicketsRepository } from "./tickets.repository.js";
import { EventsModule } from "../events/events.module.js";

@Module({
    imports: [EventsModule],
    controllers: [TicketsController],
    providers: [TicketsService, TicketsRepository]
})
export class TicketsModule {}