const mongoose = require('mongoose');

// Part Schema-
const partSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specifications: {
        type: String,
    },
    compatibility: {
        type: String,
    },
    issues: {
        type: String,
        default: "No known issues",
    },
    instructions: {
        type: String,
        default: "No instructions available",
    },
    serviceTag: {
        type: String,
    },
    modelNumber: {
        type: String,
        unique: true,
    },
}, {timestamps: true});

// Part Model-
const PartModel = mongoose.model('part', partSchema);

// Exports-
module.exports = PartModel;
