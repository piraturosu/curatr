const {
  insertTempArtwork,
  fetchTempArtworksByUser,
  removeTempArtwork,
} = require("../models/tempExhibitions.model");

exports.postTempArtwork = (req, res, next) => {
  const user_id = req.user.user_id;
  const artwork = req.body.artwork;

  if (!artwork) {
    return next({ status: 400, msg: "Artwork data is required" });
  }

  insertTempArtwork(user_id, artwork)
    .then((saved) => res.status(201).send({ temp_exhibition: saved }))
    .catch(next);
};

exports.getTempArtworks = (req, res, next) => {
  const user_id = req.user.user_id;

  fetchTempArtworksByUser(user_id)
    .then((items) => res.status(200).send({ temp_exhibitions: items }))
    .catch(next);
};

exports.deleteTempArtwork = (req, res, next) => {
  const user_id = req.user.user_id;
  const { temp_id } = req.params;

  removeTempArtwork(user_id, temp_id)
    .then(() => res.status(204).send())
    .catch(next);
};
