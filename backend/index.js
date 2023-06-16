// es6 modules
import express from 'express';
import userRouter from './routes/users.js'
import subgreddiitRouter from './routes/subgreddiit.js'
import postsRouter from './routes/posts.js'
import reportsRouter from './routes/reports.js'

import mysubgreddiitRouter from './routes/mysubgreddiit.js'

import authRouter from './routes/auth.js'
import connectDB from './utils/connectDB.js';
import cors from 'cors';

// middleware ->function which will run before calling the routes (1, 2:00:00)

// common js modules (cjs)
// const express = require('express');

// to start express server
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

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
app.use('/api/subgreddiit', subgreddiitRouter);
app.use('/api/posts', postsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/auth', authRouter);

app.use('/api/mysubgreddiit', mysubgreddiitRouter);

const PORT= 5000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}
    `);
});