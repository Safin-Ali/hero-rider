const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@cluster01.rhyj5nw.mongodb.net/hero-rider`;

async function connectDB() {
    try{
        mongoose.connect(uri);
    }
    catch{
        throw {message: `mongodb data connect error`};
    }
}

module.exports = connectDB;
