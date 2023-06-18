const mongoose = require("mongoose");

const connect = () => {
    mongoose
        .connect("mongodb://localhost:27017/todo-demo")
    .catch(err => console.log(err))
}


mongoose.connection.on("error", err => {
    console.error("MongoDB 연결 에러", err)
})

module.exports = connect