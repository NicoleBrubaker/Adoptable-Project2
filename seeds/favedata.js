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
    note: ""
  },
];
const existingFave = () => Favorite.findOne({
  where: {
    name: favedata.name
  }
});

let seedFavorites;
seedFavorites = () => Favorite.bulkCreate(favedata);
// if (!existingFave) {
// }
// else {
//   seedFavorites = () => console.log('seed favorite exists');
// }

module.exports = seedFavorites;
