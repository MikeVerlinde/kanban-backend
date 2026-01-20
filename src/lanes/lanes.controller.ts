import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { LanesService } from "./lanes.service.js";
import { ZodValidationPipe } from "../common/pipes/zod.pipe.js";
import { type CreateLaneDto, createLaneSchema } from "./dto/createLane.dto.js";
import { AuthGuard } from "../auth/auth.guard.js";
import { Lane } from "../generated/prisma/client.js";

@Controller('/lanes')
export class LanesController {

    constructor(
        private lanesService: LanesService
    ){}

    @Post()
    @UsePipes(new ZodValidationPipe(createLaneSchema))
    @UseGuards(AuthGuard)
    public async create (
        @Body() createLaneDto: CreateLaneDto,
    ) {

        const lane: Lane = await this.lanesService.create(createLaneDto)
        
        return {
            lane
        }
    }
}