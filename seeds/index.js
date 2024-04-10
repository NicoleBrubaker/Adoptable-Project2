const sequelize = require("../config/connection");
const seedUsers = require("./userdata.js");
const seedFavorites = require("./favedata.js");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedFavorites();
  process.exit(0);
};
seedAll();

module.exports = seedAll;
