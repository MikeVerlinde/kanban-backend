import { INestApplication } from "@nestjs/common";
import { App } from "supertest/types.js"
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from "../src/app.module.js";
import cookieParser from "cookie-parser";
import { AuthGuard } from "../src/auth/auth.guard.js";
import { PrismaService } from "../src/prisma/prisma.service.js";

describe('LanesController (e2e)', () => {

    let app: INestApplication<App>
    let authGuard = {
        canActivate: () => true
    }
    let prismaService = {
        lane: {
            create: () => ({
                id: 3,
                name: 'myTestLane',
                position: 2
            }),
            findMany: () => [
                {
                    id: 1,
                    name: '',
                    position: 0,
                    createdAt: new Date()
                },
                {
                    id: 2,
                    name: '',
                    position: 1,
                    createdAt: new Date()
                },
            ]
        }
    }

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard).useValue(authGuard)
            .overrideProvider(PrismaService).useValue(prismaService)
            .compile();

        app = moduleFixture.createNestApplication()
        app.use(cookieParser(process.env.COOKIE_SECRET))
        await app.init()
    })

    it('should create a lane', () => {
        return request(app.getHttpServer())
            .post('/lanes')
            .send({
                name: 'myTestLane'
            })
            .expect(201)
            .expect(res => {
                const lane = res.body.lane
                expect(lane.id).toBeDefined()
                expect(lane.name).toBe('myTestLane')
                expect(lane.position).toBe(prismaService.lane.findMany().length)
            })
    })
})