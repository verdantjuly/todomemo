const express = require("express");
const todosRouter = require("./routes/todos.js");
const connect = require('./models');

const app = express();
const port = 3000;

connect();

app.use("/api", express.json(), todosRouter)
app.use(express.static("./assets"));

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸습니다!")
})