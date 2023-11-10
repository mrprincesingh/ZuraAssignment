import express from "express";
import { createchatbot } from "../controllers/chatbotControl.js";
import singleUpload from "../middleware/multer.js";



const router = express.Router();




router
  .route("/savechatbot")
  .post(singleUpload , createchatbot  );

  export default router;