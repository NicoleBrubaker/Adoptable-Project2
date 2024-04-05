const router = require("express").Router();
const { Favorite } = require("../models")

router.get("/", async (req, res) => {
  res.render("homepage");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/user", async (req, res) => {
  try {
    const favoritesData = await Favorite.findAll();
    const favorites = favoritesData.map((favorite) =>
      favorite.get({ plain: true })
    );

    res.render("user", {
      favorites,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
