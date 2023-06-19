const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types

const todoSchema = new mongoose.Schema({
    value: String,
    doneAt: Date,
    order: Number,
    done: Boolean,
    todoid: String

},
    {
        versionKey: false,
    }
)

module.exports = mongoose.model("alltodos", todoSchema)