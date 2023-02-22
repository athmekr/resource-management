import supertest from 'supertest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from "../app";
import mongoose from "mongoose";

export const skillPayload = {
    title: "test skill",
    description: " testing the skill"
}

describe("skill", () => {

    beforeAll( async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll( async() => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("get skill route", () => {
        describe("given the skill does not exist", () => {
            it('should return a 404', async () => {
                const skillId = "63f2b29571db681c364e8c50";
                await supertest(app).get(`/skills/get/${skillId}`).expect(404);
            });
        });

        describe("given the skill does exist", () => {
            it('should return a 200', async () => {
                const create = await request(app).post(`/skills/create`).send(skillPayload);
                await request(app).get(`/skills/get/${create.body._id}`)
                expect(200);
            });
        });

        describe("at the creation of a skill", () => {
            it('should return a 201', async () => {
                const response = await request(app).post('/skills/create').send(skillPayload)
                expect(response.statusCode).toBe(201);
            });
        });
    })
});