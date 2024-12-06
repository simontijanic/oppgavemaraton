const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect('mongodb://10.12.14.252:27017/greetingsDB');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = connect;
