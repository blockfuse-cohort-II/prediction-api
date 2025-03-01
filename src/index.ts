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
    origin: secret.ORIGIN || 'http://localhost:8080',
    credentials: true
}))

app.use('/api', appRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
