const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    value: String,
    doneAt: Date,
    order: Number,
    done: Boolean,
},
    {
        versionKey: false,
    }
)



module.exports = mongoose.model("alltodos", todoSchema)