import mongoose from "mongoose";
import { config } from "../config/config";
import Logger from "./logger";

async function connect() {
    try {
        mongoose.set('strictQuery', false); // Deprecation warning
        await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
        Logger.info('Connected to MongoDB!');
    } catch (error) {
        Logger.error('Unable to connect to MongoDB');
        Logger.error(error);
    }
}

export default connect;
