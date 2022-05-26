const express = require("express");
const Task = require("./models/task");
const User = require("./models/user");
require("./db/mongoose");
const userRouter = require("../src/routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

const multer = require("multer");
const upload = multer({
  dest: "images",
});

app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disable");
//   } else {
//     next();
//   }
// });

//Goal: Setup middleware for maintance mode
//
// 1. Register a new middleware function
// 2. Send back a maintainance message with a 503 status code
// 3. Try your requests from the server and confirm status/message shows

// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. Check back soon");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//
// withour middleware : new request -> run route handler
//
// with middleware : new request -> do something -> run route handler
//

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

// const bcrypt = require("bcrypt");
// const myFunction = async () => {
//   const password = "Red12345";
//   const hashedPassword = await bcrypt.hash(password, 8);
//   console.log(password);
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare(password, hashedPassword);
//   console.log(isMatch);
// };

// myFunction();

//Hashing algorithm is the one way process
// mypass = mskdjsldjalksjdak

// const jwt = require("jsonwebtoken");

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abcd1234" }, "SECRET", {
//     expiresIn: "0 seconds",
//   });
//   console.log(token);
//   const verifyToken = await jwt.verify(token, "SECRET");
//   console.log(verifyToken);
// };

// myFunction();

// const pet = {
//   name: "Hal",
// };

// pet.toJSON = function () {
//   console.log(this);
//   return this;
// };
// console.log(JSON.stringify(pet));

// const task = require("./models/task");

// const main = async () => {
//   // const task = await Task.findById("628f1ab3928baf3bcc870d88");
//   // await task.populate("owner").execPopulate();
//   // console.log(task);
//   const user = await User.findById("628f1a02943f0d27709130c0");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();
