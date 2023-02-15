import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connect from "./services/connect";
import Logger from "./services/logger";
import employeeRoutes from "./routes/employee.routes";

dotenv.config();
// const cors = require(cors);
const app: Express = express();
const port = process.env.SERVER_URL;

app.use(express.json())
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

/** Routes */
app.use('/employees', employeeRoutes);

// app.get('/', (req, res) => {
//     res.status(200).json({message: 'yo'});
//     // res.send('Server is running!');
// });

// Error handling
app.use((req, res) => {
    const error = new Error('not found');
    Logger.error(error);
    return res.status(404).json({message: error.message});
})

app.listen(port, async () => {
    await connect();
    Logger.info(`Server is running at http://localhost:${port}`);
});