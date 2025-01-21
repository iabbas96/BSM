import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';

//declare const variable
const app = express();

//creating a new route
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN stack Tutorial');
});


//using the mongoose
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('Application is Connected to the database!!!');
       
        //declaring function for listening to the port
        app.listen(PORT, ()=> {
            //adding ouput to ensure the connectivity
            console.log(`App is listening to port: ${PORT}`);
        });

    })
    .catch(()=>{
        console.log(error);
    });