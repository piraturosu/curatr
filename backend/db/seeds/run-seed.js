const devData = require("../data/development-data/index.js");
const seed = require("./seed.js");
const db = require("../connection.js");

async function runSeed() {
  try {
    await seed(devData);
    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    db.end();
  }
}

runSeed();
