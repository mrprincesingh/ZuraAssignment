import mongoose from "mongoose";


const schema = new mongoose.Schema({
    projectName:{
        type:String,
        required: [true, "Please enter a  Project Name"]
    },
    medias: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
    createdAt:{
        type:Date , 
        default:Date.now(),
      },
})


export const Project = mongoose.model("Project", schema);