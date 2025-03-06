import cors from 'cors';
import { configDotenv } from "dotenv";
import express, {Request, Response} from 'express';
import errorHandler from './middleware/error-handler';
import "./config/mongodb-config";
import appRouter from './routes';
import { NextFunction } from 'express';
import secret from './config/secret-config';

configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: secret.ORIGIN || 'http://localhost:5173',
    credentials: true
}))

app.use('/api', appRouter);

// Handle CORS errors
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", secret.ORIGIN || 'http://localhost:5173');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
