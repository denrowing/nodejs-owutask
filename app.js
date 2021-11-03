const express = require('express');
// import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const { userRouter, appartmentRouter} = require('./routes/index');

app.use('/users', userRouter);
app.use('/appartments', appartmentRouter);

app.listen(5000, () => {
    console.log(`App listen 5000`);
});

