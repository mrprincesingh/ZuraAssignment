import express from "express";
import { deleteMediaItem, editDescription, getMedia, uploadMedia } from "../controllers/uploadMediaControl.js";


const router = express.Router();


router.route("/media").get(getMedia);

router
  .route("/uploadMedia")
  .post(uploadMedia);
  router
  .route("/editmedia")
  .put(editDescription);

  router
  .route("/deletemedia")
  .delete(deleteMediaItem);

  export default router;