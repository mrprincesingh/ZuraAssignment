import mongoose from "mongoose";


const schema = new mongoose.Schema({
    chatbotName:{
        type:String,
        required: [true, "Please enter a  Chatbot Name"]
    },
      message: {
        type: String,
        required: [true, "Please enter a  Welcome Message"],
      },
      primaryColor:{
        type: String,
        required: [true, "Please enter a Primary Color"],
      },
      fontColor:{
        type: String,
        required: [true, "Please enter a fontColor"],
      },
      fontSize:{
        type: String,
        required: [true, "Please enter a fontSize"],
      },
      chatHeight:{
        type: String,
        required: [true, "Please enter a chatbot Height"],
      },
      sources:{
        type:Boolean , 
        default: false
      },
      chatIconSize:{
        type: String,
        required: [true, "Please enter a chatbot icon size"],
      },
      positionScreen:{
        type: String,
        required: [true, "Please enter a Position Screen"],
      },
      distanceBottom:{
        type: String,
        required: [true, "Please enter a Distance bottom"],
      },
      horizontalDistance:{
        type: String,
        required: [true, "Please enter a Horizontal distance "],
      },
      chatIcon: {
        public_id: { type: String, required: true },
        url: {
          type: String,
          required: true,
        },
      },

    createdAt:{
        type:Date , 
        default:Date.now(),
      },
})


export const Chatbot = mongoose.model("Chatbot", schema);