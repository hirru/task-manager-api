const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../midllewares/auth");
const multer = require("multer");
const sharp = require("sharp");
const {
  sendWelcomeEmail,
  sendCancellationEmail,
} = require("../emails/accounts");

// Goal: Add validation to avatar upload image
//
// 1. Limit the upload size to 1MB
// 2. Only allow jpg, jpeg, png
// 3. Test your work!
//    - Upload large files (should fail)
//    - Upload non-images ( should-fail )

const upload = multer({
  // dest: "avatars",
  limits: {
    fileSize: 1000000, //1mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File must be an image"));
    }
    cb(undefined, true);
  },
});

// Goal: Have signup send back auth token
//
// 1. Generate a token for the saved user
// 2. Send back both the token and the user
// 3. Create a new user from postman and confirm the token there

//create users
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }

  // user
  //   .save()
  //   .then((user) => {
  //     console.log(user);
  //     res.status(201).send(user);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error.message);
  //   });
});

//signin user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({
      user: user,
      token,
    });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Goal: Create a way to logout all the sessions
//
// 1. Setup POST /users/logoutAll
// 2. Create a route handler to wipe the tokens array
//   - send 200 or 500
// 3. Test your work
//   - Login a few times and logout of all. check database
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//fetch users
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }

  // User.find({})
  //   .then((users) => {
  //     res.status(200).send(users);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error.message);
  //   });
});

router.get("/users/me", auth, (req, res) => {
  res.send(req.user);
});

//get user by id
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
  // User.findById(_id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  //     res.send(user);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error.message);
  //   });
});

//update user by id
router.patch("/users/update/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }
  const _id = req.params.id;
  try {
    //to make our middleware work for update also
    const user = await User.findById(_id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
  // User.findById(_id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  //     res.send(user);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error.message);
  //   });
});

//Goal: Refactor the update profile route
//
// 1. Update the url to /users/me
// 2. Add the authentication middleware into the mix
// 3. User the existing user document instead of fetching via param id
// 4. Test your work in the postman

//update user by id
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    //to make our middleware work for update also
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
  // User.findById(_id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  //     res.send(user);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error.message);
  //   });
});

//delete user
// router.delete("/users/:id", auth, async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.user.id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

//delete user more optimal
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

//
// Goal: Setup end point for avatar upload
//
// 1. Add POST /users/me/avatar to user router
// 2. Setup multer to store uploads in the avatar directory
// 3. Choose name 'avatar' for the key when registering the middleware
// 4. Send back a 200 rsponse from route handler
// 5. Test your work. Create new task App request and upload image

// const errorMiddleware = (req, res, next) => {
//   throw new Error("From my middleware");
// };

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;

    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//
// Goal: Setup route to delete avatar
//
// 1. Setup DELETE /users/me/avatar
// 2. Add Authentication
// 3. Setup the field to undefined and save the user sending back a 200
// 4. Test your work by creating new request for task app in postman

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error("");
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(400).res.send();
  }
});

module.exports = router;
