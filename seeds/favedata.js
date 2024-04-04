const { Favorite } = require("../models");

const favedata = [
  {
    user_id: 1,
    name: "Spot",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bulldog_inglese.jpg/640px-Bulldog_inglese.jpg",
    breed: "Bulldog",
    age: "Puppy",
    gender: "Male",
    profile_url: "petfinder.com",
  },
];

const seedFavorites = () => Favorite.bulkCreate(favedata);

module.exports = seedFavorites;
