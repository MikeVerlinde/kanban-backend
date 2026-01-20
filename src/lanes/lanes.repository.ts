import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { Lane, Prisma } from "../generated/prisma/client.js";

@Injectable()
export class LanesRepository {

    constructor(
        private prisma: PrismaService
    ){}

    public async create (
        args: Prisma.LaneCreateArgs
    ): Promise<Lane> {

        return await this.prisma.lane.create(args)
    }

    public async get(
        args: Prisma.LaneFindManyArgs
    ): Promise<Lane[]> {
        return await this.prisma.lane.findMany(args)
    }
}