import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app from "../app";
import mongoose from "mongoose";
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

        // describe("given the employee does exist", () => {
        //     it('should return a 200', async () => {
        //         const employeeId = '63f2b29571db681c364e8c54';
        //         await supertest(app).get(`/employees/get/${employeeId}`).expect(200);
        //     });
        // });
    })
});