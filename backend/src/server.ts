import dotenv from 'dotenv';
import connect from './services/connect';
import Logger from './services/logger';
import app from "./app";

dotenv.config();

const port = process.env.SERVER_URL;

app.listen(port, async () => {
    await connect();
    Logger.info(`Server is running at http://localhost:${port}`);
});