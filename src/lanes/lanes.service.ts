import { Injectable } from "@nestjs/common";
import { LanesRepository } from "./lanes.repository.js";
import { CreateLaneDto } from "./dto/createLane.dto.js";
import { Lane } from "../generated/prisma/client.js";

@Injectable()
export class LanesService {

    constructor(
        private lanesRepository: LanesRepository
    ){}

    public async create (
        createLaneDto: CreateLaneDto
    ): Promise<Lane> {

        // Get lanes
        const existingLanes: Lane[] = await this.get({})
        
        // Create lane
        return await this.lanesRepository.create({
            data: {
                name: createLaneDto.name,
                position: existingLanes.length,
                createdAt: new Date()
            }
        })
    }

    public async get (
        filter: {}
    ): Promise<Lane[]> {
        return await this.lanesRepository.get(filter)
    }
}