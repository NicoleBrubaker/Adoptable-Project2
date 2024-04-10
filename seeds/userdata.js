const { User } = require("../models");

const userdata = [
  {
    firstname: "Nicole",
    email: "sample@sample.com",
    password: "abcABC123",
  },
];

const existingUser = () => User.findOne({
  where: {
    email: userdata.email
  }
});

let seedUsers;
seedUsers = () => User.bulkCreate(userdata);
// if (!existingUser) {
  
// }
// else {
//   seedUsers = () => console.log('seed user exists');
// }

module.exports = seedUsers;