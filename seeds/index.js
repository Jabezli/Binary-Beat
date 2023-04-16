const seedUsers = require("./userSeed");
const seedPosts = require("./postSeed");
const seedComments = require("./commentSeed");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  console.log("\n================User Data Seeded================\n");

  await seedPosts();
  console.log("\n================Post Data Seeded================\n");

  await seedComments();
  console.log("\n================Comment Data Seeded================\n");

  process.exit(0);
};

seedAll();
