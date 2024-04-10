const sequelize = require("../config/connection");
const seedUsers = require("./userdata.js");
const seedFavorites = require("./favedata.js");

const seedAll = async () => {
  await seedUsers();
  await seedFavorites();
};

module.exports = seedAll;
