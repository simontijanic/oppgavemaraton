const mongoose = require('mongoose');

const greetingSchema = new mongoose.Schema({
    message: String,
});

const Greeting = mongoose.model('Greeting', greetingSchema);

module.exports = Greeting;
