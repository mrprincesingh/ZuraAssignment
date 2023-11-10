import express from "express";
import { createProject, getAllProject } from "../controllers/createProjectControl.js";

const router = express.Router();


router.route("/project").get(getAllProject);

router
  .route("/createproject")
  .post(createProject);

  export default router;