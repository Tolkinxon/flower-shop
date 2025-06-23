import express from 'express';
import { serverConfig } from './config.js';
import { mainRouter } from './routes/main.routes.js';

const app = express();

app.use(express.json());
app.use('/api', mainRouter);


const { PORT } = serverConfig;
app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));