// es6 modules
import express from 'express';
import userRouter from './routes/users.js'
import postsRouter from './routes/posts.js'
import todoRouter from './routes/todo.js'
import authRouter from './routes/auth.js'
import connectDB from './utils/connectDB.js';

// middleware -> function which will run before calling the routes

// common js modules (cjs)
// const express = require('express');

// to start express server
const app = express();

connectDB();

app.use(express.json());

/*
/users
GET -> get some data
POST -> create a new user
DELETE -> delete a user
PUT -> updating a user
PATCH -> updating a user
*/

/*
/api -> backend to handle it
otherwise frontend
*/

// telling the app to use userRouter for every request coming to /api/users
app.use('/api/users', userRouter);
// telling the app to use postsRouter for every request coming to /api/posts
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

// change
app.use('/api/subgreddiit', subgredRouter);
app.use('/api/mysubgreddiit', mysubgredRouter);



const PORT= 8000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}
    `);
});
