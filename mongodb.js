//CRUD - create read update delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const database = "task-manager";

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id);
// console.log(id.id.length);
// console.log(id.toHexString().length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    console.log("Connected to database");
    const db = client.db(database);

    // db.collection("users").insertOne({
    //   _id: id,
    //   name: "Vikram",
    //   age: 27,
    // });

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Jen",
    //       age: 28,
    //     },
    //     {
    //       name: "Gunther",
    //       age: 27,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // Goal: Insert 3 tasks into a new tasks collection
    //
    // 1. Use insertMany to insert the documents
    //     ~ description ( string ), completed
    // 2. setup the callback to handle error or print ops
    // 3. Run the script
    // 4. Refresh the database in Robo 3T and view data in tasks collection

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "2 DSA questions",
    //       completed: true,
    //     },
    //     {
    //       description: "Trade",
    //       completed: true,
    //     },
    //     {
    //       description: "Nodejs course complete",
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").findOne(
    //   { _id: ObjectID("628c86cf0c64e02a7851f8fc") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to find the user");
    //     }
    //     console.log(user);
    //   }
    // );

    //find method does not take any call back as an argument
    // db.collection("users")
    //   .find({ age: 27 })
    //   .toArray((error, users) => {
    //     if (error) {
    //       return console.log("No user found");
    //     }
    //     console.log(users);
    //   });

    //Goal: Use find and findOne with tasks
    //
    // 1. Use findOne to fetch the last task by its id ( print doc to console )
    // 2. Use find to fetch all tasks that are not completed ( print docs to console )
    // 3. Test your work.

    // db.collection("tasks").findOne(
    //   { _id: new ObjectID("628c7d18fe37523bcc913425") },
    //   (error, task) => {
    //     if (error) {
    //       return console.log("Unable to find the task");
    //     }

    //     console.log(task);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: true })
    //   .toArray((error, tasks) => {
    //     if (error) {
    //       return console.log("Unable to find the tasks");
    //     }

    //     console.log(tasks);
    //   });

    //Update operation
    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("628c86cf0c64e02a7851f8fc"),
    //     },
    //     {
    //       $inc: {
    //         age: 3,
    //       },
    //     }
    //   )
    //   .then((user) => {
    //     console.log(user);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //updateMany
    db.collection("tasks")
      .updateMany(
        { completed: true },
        {
          $set: {
            completed: false,
          },
        }
      )
      .then((task) => {
        console.log(task.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });

    //delete user
    // db.collection("users")
    //   .deleteOne({
    //     _id: new ObjectID("628c79688edfc140b8e2001c"),
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // deleteMany
    // db.collection("users")
    //   .deleteMany({
    //     age: 27,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Goal: Use deleteOne to remove a task
    //
    // 1. Grab the description for the task you want to remove
    // 2. Setup the call with the query
    // 3. Use promise methods to setup the success/error handlers
    // 4. Test your work.
    db.collection("tasks")
      .deleteOne({
        description: "Trade",
      })
      .then((result) => {
        console.log("Success", result);
      })
      .catch((error) => {
        console.log("Errro", error);
      });
  }
);
