require("../src/db/mongoose");
const User = require("../src/models/user");

//628cde0b0c2227294cc8185a
User.findByIdAndUpdate("628cf23fad124728c8be9949", { age: 1 })
  .then((user) => {
    console.log(user);

    return User.countDocuments({ age: 1 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });

// Goal: Mess around with promise chaining
//
// 1. Create promise-chaining-2.js
// 2. Load in mongoose and task model
// 3. Remove a given task by id
// 4. Get and print the total number of incomplete task
// 5. Test your work.
