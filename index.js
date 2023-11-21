const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json());

require('./bot/bot')

async function dev() {
    try {
        await mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log('Mongo db connected');
        }).catch((error) => {
            console.log(error);
        });
        app.listen(process.env.PORT, () => {
            console.log('Server is running')
        })
    } catch (exception) {
        console.log(exception);
    }

}

dev();
