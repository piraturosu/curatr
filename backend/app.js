const express = require("express");
const cors = require("cors");
const app = express();
const endpoints = require("./endpoints.json");

const authRouter = require("./routes/auth.routes");
const tempExhibitionRouter = require("./routes/tempExhibitions.routes");


app.use(cors());
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/exhibitions/temp", tempExhibitionRouter);
app.get("/api", (req, res) => {
  res.status(200).send({ endpoints });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
  }
});

module.exports = app;
