const { User } = require("../models");

const userdata = [
  {
    firstname: "Nicole",
    email: "sample@sample.com",
    password: "abcABC123",
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
