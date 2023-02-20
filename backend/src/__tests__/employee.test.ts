import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app from "../app";
import mongoose from "mongoose";
describe("employee", () => {

    beforeAll( async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll( async() => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("get employee route", () => {
        describe("given the employee does not exist", () => {
            it('should return a 404', async () => {
                const employeeId = "63f2b29571db681c364e8c50";
                await supertest(app).get(`/employees/get/${employeeId}`).expect(404);
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