const router = require("express").Router();
const { User } = require("../../models");

// New user sign up
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;

      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;

      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
    res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
