import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Project } from "../models/CreateProjectModel.js";
import ErrorHandler from "../utils/errorHandler.js";


export const getAllProject = catchAsyncError(async (req, res, next) => {
    const project = await Project.find();
  
    res.status(200).json({
      success: true,
      project,
    });
  });

export const createProject = catchAsyncError(async (req, res, next) => {
    const { projectName } = req.body;

    if (!projectName ) {
        return next(new ErrorHandler("Please enter Project Name", 400));
      }

      await Project.create({
        projectName
      })

      res.status(201).json({
        success: true,
        message: "Project created successfully.",
      });
})