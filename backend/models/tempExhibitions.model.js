const db = require("../db/connection");

exports.insertTempArtwork = async (user_id, artwork) => {
  const { rows } = await db.query(
    `INSERT INTO temp_exhibitions (user_id, artwork)
     VALUES ($1, $2)
     RETURNING *;`,
    [user_id, artwork],
  );
  return rows[0];
};

exports.fetchTempArtworksByUser = async (user_id) => {
  const { rows } = await db.query(
    `SELECT * FROM temp_exhibitions
     WHERE user_id = $1
     ORDER BY created_at DESC;`,
    [user_id],
  );
  return rows;
};

exports.removeTempArtwork = async (user_id, temp_id) => {
  const { rows } = await db.query(
    `DELETE FROM temp_exhibitions
     WHERE temp_id = $1 AND user_id = $2
     RETURNING *;`,
    [temp_id, user_id],
  );

  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Item not found" });
  }
};
