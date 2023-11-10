import express from "express";
import {config} from "dotenv";
import cors from "cors";

config({
    path:"./config/config.env"
})

const app = express();
app.use(express.json())
app.use(express.urlencoded({
  extended: true,
}))
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  import project from "./routes/createProjectroute.js"
  import media from "./routes/uploadMediaroute.js"
  import chatbot from "./routes/chatbotroute.js"
import { ErrorMiddleware } from "./middleware/Error.js";
import bodyParser from "body-parser";
   app.use("/api/v1/" ,project)
   app.use("/api/v1/" ,media)
   app.use("/api/v1/" ,chatbot)

  export default app ;
  app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);

app.use(ErrorMiddleware)