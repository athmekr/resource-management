import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from "../app";
import mongoose from "mongoose";
import request from "supertest";

export const employeePayload = {
    firstname: "testing firstname",
    surname: "testing surname",
    hiringDate: "2023-02-15T21:27:07.092+00:00",
    skills: ["63f22847e9443af2df6ca04a"]
}

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

        describe("given the employee does exist", () => {
            it('should return a 200', async () => {
                const create = await request(app).post(`/employees/create`).send(employeePayload);
                await request(app).get(`/employees/get/${create.body._id}`)
                expect(200);
            });
        });

        describe("at the creation of an employee", () => {
            it('should return a 201', async () => {
                const response = await request(app).post('/employees/create').send(employeePayload)
                expect(response.statusCode).toBe(201);
            });
        });
    })
});