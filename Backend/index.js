import express from "express";
import {PORT, mongoURL} from "./config.js"
import mongoose, { mongo } from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors";

const app = express();
//middleware parser
app.use(express.json());
//allows (*) everything
app.use(cors());
//allows custome origins
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

//test
app.get("/", (request, response) =>{
    console.log(request)
    return response.status(200).send("Welcome");
});

app.use("/books", booksRoute);

mongoose
    .connect(mongoURL)
    .then(()=>{
        console.log("App connected to DB");
        app.listen(PORT, () =>{
            console.log(`App is listening on port ${PORT}`)
        });
        
    })
    .catch((error)=>{
        console.log(error);
    });

