import express from 'express';
import userRoutes from './routes/user_routes.js';
import adminRouter from './routes/admin_routes.js';
import cors from 'cors';
import proxyRouter from './proxy/index.js';

 
const app = express();
const port = 3000;

//middlewares
app.use(express.json());
app.use(cors());

//proxy
app.use("/api/proxy", proxyRouter);

//Routes
app.use('/user', userRoutes);
app.use('/admin', adminRouter);

export default app;
