import { Module } from "@nestjs/common";
import { LanesController } from "./lanes.controller.js";
import { LanesService } from "./lanes.service.js";
import { LanesRepository } from "./lanes.repository.js";

@Module({
    controllers: [LanesController],
    providers: [LanesService, LanesRepository]
})
export class LanesModule {}