import express from 'express';
import { checkGEEInitialized, fetchFloodMapping, fetchLocationMappings } from '../controller/admin_controller.js';
import userController from '../controller/user_controller.js';

 
const adminRouter = express.Router();

adminRouter.post("/login"); 
adminRouter.post("/signup");
adminRouter.post("/floopMapping", checkGEEInitialized , fetchFloodMapping);


adminRouter.get("/locationMapping", fetchLocationMappings);
adminRouter.get("/volunteer-fetch",userController.fetchVolunteerData);



export default adminRouter;