const router = require("express").Router();
const { Favorite, User } = require("../models");
const withAuth = require("../utils/withAuth");
const { getToken } = require("../utils/tokenManager");
router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});
router.get("/login", async (req, res) => {
  res.render("login");
});
router.get("/signup", async (req, res) => {
  res.render("signup");
});
router.get("/user", withAuth, async (req, res) => {
  try {
    const favoritesData = await Favorite.findAll();
    const favorites = favoritesData.map((favorite) =>
      favorite.get({ plain: true })
    );
    res.render("user", {
      favorites,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/search", async (req, res) => {
  const breed = req.query.breed;
  try {
    const token = await getToken();
    let apiUrl = `https://api.petfinder.com/v2/animals?type=dog&breed=${encodeURIComponent(
      breed
    )}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // Now, instead of just sending JSON data, render a Handlebars view and pass the data
    res.render("results", { dogs: data.animals });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).send("Server error");
  }
});
module.exports = router;