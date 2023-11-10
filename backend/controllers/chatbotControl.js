import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Chatbot } from "../models/ChatbotModel.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler.js";

export const createchatbot = catchAsyncError(async (req, res, next) => {
  let {
    chatbotName,
    message,
    primaryColor,
    fontColor,
    fontSize,
    chatHeight,
    sources,
    chatIconSize,
    positionScreen,
    distanceBottom,
    horizontalDistance,
  } = req.body;
  let file = req.file;

  if (
    !chatbotName ||
    !message ||
    !primaryColor ||
    !fontColor ||
    !fontSize ||
    !chatHeight ||
    !sources ||
    !chatIconSize ||
    !positionScreen ||
    !distanceBottom ||
    !horizontalDistance ||
    !file
  ) {
    return next(new ErrorHandler("Please enter all required fields", 400));
  }

  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  // Use const or let to declare Chatbot
  const newChatbot = await Chatbot.create({
    chatbotName,
    message,
    primaryColor,
    fontColor,
    fontSize,
    chatHeight,
    sources,
    chatIconSize,
    positionScreen,
    distanceBottom,
    horizontalDistance,
    chatIcon: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "ChatBot created successfully.",
    chatbot: newChatbot,
  });
});
