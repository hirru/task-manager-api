require("../src/db/mongoose");
const Task = require("../src/models/task");

//628cde0b0c2227294cc8185a
// Task.findByIdAndDelete("628dd6a9830c0150cc07a44d")
//   .then((task) => {
//     console.log(task);

//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// Goal: Mess around with promise chaining
//
// 1. Create promise-chaining-2.js
// 2. Load in mongoose and task model
// 3. Remove a given task by id
// 4. Get and print the total number of incomplete task
// 5. Test your work.

//
// Goal: Use Async/Await
//
// 1. Create deleteTaskAndCount as an async function
//    - Accept id of task to remove
// 2. Use await to delete task and count up incomplete task
// 3. Return the count
// 4. Call the function and attach then/catch to log results
// 5. Test your work.

const deleteTaskAndCount = async (taskId) => {
  await Task.findByIdAndDelete(taskId);
  const count = Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("628dd80585b4434218fd3091")
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
