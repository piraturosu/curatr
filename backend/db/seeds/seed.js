const db = require("../connection");
const format = require("pg-format");

const seed = async ({ usersData, exhibitionsData }) => {
  await db.query("DROP TABLE IF EXISTS exhibitions CASCADE;");
  await db.query("DROP TABLE IF EXISTS users CASCADE;");

  await db.query(`
    CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE exhibitions (
      exhibition_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
      title VARCHAR(100),
      artworks JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  const formattedUsers = usersData.map((user) => [user.username, user.password_hash]);
  const userInsertStr = format(
    `INSERT INTO users (username, password_hash) VALUES %L RETURNING *;`,
    formattedUsers,
  );
  const { rows: insertedUsers } = await db.query(userInsertStr);

  const formattedExhibitions = exhibitionsData.map((ex) => [
    ex.user_id,
    ex.title,
    JSON.stringify(ex.artworks),
  ]);
  await db.query(
    format(
      `INSERT INTO exhibitions (user_id, title, artworks) VALUES %L RETURNING *;`,
      formattedExhibitions,
    ),
  );

  console.log("Seeding complete.");
};

module.exports = seed;
