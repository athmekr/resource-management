import express, { Express } from 'express';
import Logger from './services/logger';
import employeeRoutes from './routes/employee.routes';
import skillRoutes from './routes/skills.routes'

const app: Express = express();

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Routes */
app.use('/employees', employeeRoutes);
app.use('/skills', skillRoutes);

/** Error handling for non existing route */
app.use((req, res) => {
    const error = new Error('not found');
    Logger.error(error);
    return res.status(404).json({message: error.message});
})


export default app;