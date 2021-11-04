const express = require('express');
const mongoose = require('mongoose');
const { MONGO_CONNECT_URL, PORT } = require('./configs/configs');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const { userRouter, appartmentRouter} = require('./routes/index');

app.use('/users', userRouter);
app.use('/appartments', appartmentRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

