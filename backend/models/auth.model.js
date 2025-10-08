const db = require("../db/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.insertUser = async (username, password) => {
  const { rows: existing } = await db.query(
    "SELECT * FROM users WHERE username = $1;",
    [username],
  );
  if (existing.length > 0) {
    return Promise.reject({
      status: 409,
      msg: "Username already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const { rows } = await db.query(
    "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING user_id, username;",
    [username, password_hash],
  );

  const user = rows[0];

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "2h" });

  return { token, user };
};

exports.verifyUserLogin = async (username, password) => {
  const { rows } = await db.query("SELECT * FROM users WHERE username = $1;", [
    username,
  ]);
  const user = rows[0];

  if (!user) {
    return Promise.reject({ status: 401, msg: "Invalid credentials" });
  }
  console.log("DB hash:", user.password_hash);
  console.log("Given password:", password);
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return Promise.reject({ status: 401, msg: "Invalid credentials" });
  }

  const token = jwt.sign(
    { user_id: user.user_id, username: user.username },
    JWT_SECRET,
    { expiresIn: "2h" },
  );

  return { token, user: { user_id: user.user_id, username: user.username } };
};
