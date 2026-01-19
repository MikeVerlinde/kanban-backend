import { INestApplication } from "@nestjs/common"
import { App } from "supertest/types.js"
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from "../src/app.module.js";
import cookieParser from "cookie-parser";

describe('AuthController (e2e)', () => {

    let app: INestApplication<App>

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication()
        app.use(cookieParser(process.env.COOKIE_SECRET))
        await app.init()
    })

    it('sets cookie on successful login', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                username: 'Mike',
                password: "Mike123!"
            })
            .expect(201)
            .expect((res) => {
                const setCookieHeader = res.headers['set-cookie']
                expect(setCookieHeader).toBeDefined()
            })
    })

    it('returns unauthorized on wrong password', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                username: 'Mike',
                password: "WrongPassword"
            })
            .expect(401)
    })

    it('returns unauthorized on non-existing user', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                username: 'IDontExist',
                password: "WrongPassword"
            })
            .expect(401)
    })
})