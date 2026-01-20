import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module.js";
import { LanesModule } from "./lanes/lanes.module.js";

@Module({
    imports: [PrismaModule, UsersModule, AuthModule, LanesModule, ConfigModule.forRoot()]
})
export class AppModule {}