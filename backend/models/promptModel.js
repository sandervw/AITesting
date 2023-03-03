const mongoose = require('mongoose');

const Schema = mongoose.Schema

const promptSchema = new Schema ({
    promptType: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    responseTime: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Prompt', promptSchema);