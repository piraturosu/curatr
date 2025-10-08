const { insertUser, verifyUserLogin } = require("../models/auth.model");

exports.registerUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next({
      status: 400,
      msg: "Username and password required",
    });

  insertUser(username, password)
    .then(({ token, user }) => {
      res.status(201).send({ token, user });
    })
    .catch(next);
};

exports.loginUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next({
      status: 400,
      msg: "Username and password required",
    });

  verifyUserLogin(username, password)
    .then(({ token, user }) => {
      res.status(200).send({ token, user });
    })
    .catch(next);
};
