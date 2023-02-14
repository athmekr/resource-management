import dotenv from "dotenv";

dotenv.config();

const SERVER_URL = process.env.SERVER_URL ?  Number(process.env.SERVER_URL) : 8000;
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.rarqw1p.mongodb.net`;


export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_URL
    }
}