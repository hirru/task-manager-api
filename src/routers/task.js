const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../midllewares/auth");

// Goal: Setup the task creation endpoint
//
// 1. Create a seperate file for a task model and load it into index.js
// 2. Create the task creation endpoint and handle success and error.
// 3. Test the endpoint from postman with good and bad data

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }

  // task
  //   .save()
  //   .then((task) => {
  //     res.status(201).send(task);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error.message);
  //   });
});

// Goal: Setup the task reading endpoints
//
//1. Create an endpoint for fetching all the tasks
//2. Create an endpoint for fetching task by its ids
//3. Setup new request in postman and test your work

//GET /tasks - return all tasks
//GET /tasks?completed=true
// For Pagination we need to params limit and skip
//GET /tasks?limit=10&skip=10
//GET /tasks?sortBy=createdAt_asc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  console.log(sort);
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
  // Task.find({})
  //   .then((tasks) => {
  //     res.send(tasks);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error.message);
  //   });
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }

  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       res.status(400).send();
  //     }
  //     res.send(task);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error.message);
  //   });
});

// Goal:  Allow for task updates
//
// 1. setup the route handler
// 2. Send error if unknown updates
// 3. Attempt to update the task
//    - Handle task not found
//    - Handle validator error
//    - Handle success
// 4. Test your work

//Goal: Change how task are updated
//
// 1. Find the task
// 2. Alter the task properties
// 3. Save the task
// 4. Test your work by updating a task from postman

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send("Invalid updates");
  }
  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Goal: Allow for removal of tasks
//
// 1. Setup the endpoint handler
// 2. Attempt to delete the task by id
//    - Handle Success
//    - handle task not found
//    - Handle error
// 3. Test your work

//Goal: Refactor DELETE /tasks/:id
//
// 1. Add Authentication
// 2. find the task by _id/owner findOneAndDelete()
// 3. Test your work

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    co;
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
