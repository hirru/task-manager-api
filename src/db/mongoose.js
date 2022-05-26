const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

//Goal: Add a password field to the user
//
// 1. Setup the field as the required string
// 2. Ensure the length is greater than 6
// 3. Trim the password
// 4. Ensure that password doesn't contain 'password'
// 5. Test your work

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error("Should not contain password string");
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be a positive number");
//       }
//     },
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
// });

// const me = new User({
//   name: "  Andrew",
//   email: "MIKE@gmail.com",
//   password: "test@123",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error", error);
//   });

// Goal: Create a model for tasks
//
// 1. Define the model with description and completed fields
// 2. Create a new instance of a model
// 3. Save the model to the database
// 4. Test your work

// Goal: Add validation and sanitization to task
//
// 1. Trim the description and make it required
// 2. Make completed optional and default it to false
// 3. Test your work with and without errors

// const Task = mongoose.model("Task", {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });

// const task = new Task({
//   description: "  This is the first task  ",
// });

// task
//   .save()
//   .then((task) => {
//     console.log(task);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
