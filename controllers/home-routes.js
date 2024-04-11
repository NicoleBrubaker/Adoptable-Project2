const router = require("express").Router();
const { Favorite, User } = require("../models");
const withAuth = require("../utils/withAuth");
const { getToken } = require("../utils/tokenManager");
router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

// used for user log in
router.get("/login", async (req, res) => {
  res.render("login");
});

// used for user signup
router.get("/signup", async (req, res) => {
  res.render("signup");
});

// the "user" page where favorites are displayed
router.get("/user", withAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const userData = await User.findByPk(userId);
    const user = userData.get({ plain: true });
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

// using the petfinder api to search based on entered breed
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

// adding a new favorite
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

// removing a favorite
router.delete("/favorite/:id", withAuth, async (req, res) => {
 try {
   // Extracting favoriteId from the route parameters
   const favoriteId = req.params.id;
   console.log("Favorite ID:", favoriteId); // Log to verify it's received

   const userId = req.session.userId;
   const favorite = await Favorite.findOne({
     where: { id: favoriteId, user_id: userId },
   });

   await favorite.destroy();
   res.json({ message: "Favorite removed successfully." });
 } catch (error) {
   console.error(error);
   res.status(500).send("An error occurred.");
 }

});

module.exports = router;
