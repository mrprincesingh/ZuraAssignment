import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter a  Project Name"]
    },
      description: {
        type: String,
        required: [true, "Please enter a  course description"],
      },
      status:{
        type: String,
        default: "Done",
      },
    createdAt:{
        type:Date , 
        default:Date.now(),
      },
})


export const Media = mongoose.model("Media", schema);