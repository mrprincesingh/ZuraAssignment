import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Media } from "../models/UploadMediaModel.js";
import ErrorHandler from "../utils/errorHandler.js";


export const getMedia = catchAsyncError(async (req, res, next) => {
    const media = await Media.find();
  
    res.status(200).json({
      success: true,
      media,
    });
  });

export const uploadMedia = catchAsyncError(async (req, res, next) => {
    const { name , description } = req.body;

    if (!name || !description ) {
        return next(new ErrorHandler("Please enter Required field", 400));
      }

      await Media.create({
        name,
        description
      })

      res.status(201).json({
        success: true,
        message: "Media Uplaoded successfully.",
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
  const itemId = req.body.itemId; 
  if (!itemId) {
    return next(new ErrorHandler("Please provide an itemId.", 400));
  }
    const mediaItem = await Media.findById(itemId);
    if (!mediaItem) {
      return next(new ErrorHandler("Media item not found.", 404));
    }
   console.log(mediaItem)
    await mediaItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Media item deleted successfully.",
    });

});