import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import { Lane, Ticket } from "../generated/prisma/client.js";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard.js";


@WebSocketGateway({
    namespace: '/ws',
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    }
})
@UseGuards(AuthGuard)
export class EventsGateway {

    @WebSocketServer()
    private server: Server

    emitTicketCreated(ticket: Ticket) {
        this.server.emit('ticketCreated', ticket)
    }

    emitTicketUpdated(ticket: Ticket) {
        this.server.emit('ticketUpdated', ticket)
    }

    emitLaneCreated(lane: Lane) {
        this.server.emit('laneCreated', lane)
    }
}