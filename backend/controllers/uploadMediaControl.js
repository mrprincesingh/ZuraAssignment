import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Project } from "../models/CreateProjectModel.js";
import { Media } from "../models/UploadMediaModel.js";
import ErrorHandler from "../utils/errorHandler.js";


// export const getMedia = catchAsyncError(async (req, res, next) => {
//     const media = await Media.find();
  
//     res.status(200).json({
//       success: true,
//       media,
//     });
//   });

  export const getMedia = catchAsyncError(async (req, res, next) => {
    const projectId = req.query.projectId;

  if (!projectId) {
    return next(new ErrorHandler("Please provide a Project ID.", 400));
  }

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new ErrorHandler("Project not found.", 404));
  }

  const mediaIds = project.medias; // Assuming 'medias' is an array of media IDs in the Project model

  const media = await Media.find({ _id: { $in: mediaIds } });

  res.status(200).json({
    success: true,
    media,
  });
  });

export const uploadMedia = catchAsyncError(async (req, res, next) => {
  const { projectId, name, description } = req.body;

  if (!projectId || !name || !description) {
    return next(new ErrorHandler("Please provide Project ID, name, and description.", 400));
  }

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new ErrorHandler("Project not found.", 404));
  }

  const media = await Media.create({
    name,
    description,
  });

  project.medias.push(media._id); // Add media reference to the project
  await project.save();

  res.status(201).json({
    success: true,
    message: "Media added to project successfully.",
    
    media,
  });
})

export const editDescription = catchAsyncError(async (req, res, next) => {
  const { itemId, description } = req.body;

  if (!itemId || !description) {
    return next(new ErrorHandler("Please provide  description.", 400));
  }   
    const mediaItem = await Media.findById(itemId);

    if (!mediaItem) {
      return next(new ErrorHandler("Media item not found.", 404));
    }

    mediaItem.description = description;

    await mediaItem.save();

    res.status(200).json({
      success: true,
      message: "Description updated successfully.",
      updatedMediaItem: mediaItem,
    });
  
});

export const deleteMediaItem = catchAsyncError(async (req, res, next) => {
  const { projectId, mediaId } = req.body;

  if (!projectId || !mediaId) {
    return next(new ErrorHandler("Please provide Project ID and Media ID.", 400));
  }

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new ErrorHandler("Project not found.", 404));
  }

  const index = project.medias.indexOf(mediaId);
  if (index !== -1) {
    project.medias.splice(index, 1); // Remove media reference from the project
    await project.save();
  }

  const media = await Media.findByIdAndDelete(mediaId);

  res.status(200).json({
    success: true,
    message: "Media removed from project successfully.",
    project,
    media,
  });

});