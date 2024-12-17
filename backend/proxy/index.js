import express from 'express';
import googleMapRouter from './googleMapProxy.js';


const proxyRouter = express.Router();

proxyRouter.use("/map", googleMapRouter);


export default proxyRouter;