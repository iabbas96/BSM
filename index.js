import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";

//declare const variable
const app = express();

//Middleware for parsing request body
app.use(express.json());

//creating a new route
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN stack Tutorial');
});

//new route to save a new book and POSTMAN is used for testing POST method
app.post('/books', async (request, response)=>{
    try{
        //adding a validation
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all fields is required: title, author, publishYear',
            });
        }

        //declaring new book
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        //calling new book and sending message to it
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
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