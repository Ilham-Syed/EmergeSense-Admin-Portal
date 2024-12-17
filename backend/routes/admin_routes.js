import express from 'express';
import { checkGEEInitialized, fetchFloodMapping } from '../controller/admin_controller.js';


const adminRouter = express.Router();

adminRouter.post("/login"); 
adminRouter.post("/signup");
adminRouter.post("/floopMapping", checkGEEInitialized , fetchFloodMapping);


adminRouter.get("/locationMapping"); // location alerts of the usersd



export default adminRouter;