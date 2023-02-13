import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_URL;
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});