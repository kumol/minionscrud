const mongoose = require("mongoose");

module.exports = mongoose.model("Minion", new mongoose.Schema({
    age: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
}), "minions")