const seedUsers = require("./userSeed");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  seedUsers();
  console.log("\n================User Data Seeded================\n");

  process.exit(0);
};

seedAll();
