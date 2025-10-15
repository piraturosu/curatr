const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  postTempArtwork,
  getTempArtworks,
  deleteTempArtwork,
} = require("../controllers/tempExhibitions.controller");

router.post("/", verifyToken, postTempArtwork);
router.get("/", verifyToken, getTempArtworks);
router.delete("/:temp_id", verifyToken, deleteTempArtwork);

module.exports = router;
