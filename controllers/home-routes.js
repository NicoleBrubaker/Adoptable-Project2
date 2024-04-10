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
    const userId = req.session.userId;
    const userData = await User.findByPk(userId);
    const user = userData.get({ plain: true }); //(edited) 
    const favoritesData = await Favorite.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
    });
    const favorites = favoritesData.map((favorite) =>
      favorite.get({ plain: true })
    );
    res.render("user", {
      user,
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
    res.render("results", {
      loggedIn: req.session.loggedIn,
      dogs: data.animals,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).send("Server error");
  }
});

router.post("/favorite", withAuth, async (req, res) => {
  try {
   
    const { id, name, breed, age, gender, url, photo } = req.body;
    const userId = req.session.userId;

    await Favorite.create({
      dogId: id,
      name,
      breed,
      age,
      gender,
      photo,
      profile_url: url,
      user_id: userId,
    });

    res.json({ message: "Dog favorited successfully" });
  } catch (error) {
    console.error("Error saving favorite:", error);
    res.status(500).json({ message: "Error saving favorite" });
  }
});

module.exports = router;
