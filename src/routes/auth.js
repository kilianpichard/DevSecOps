const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const { login, register, loggedIn, home } = require("../views");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/login", (req, res) => {
  const cookies = req.headers.cookie;
  if (!cookies || !cookies.includes("jwt=")) {
    res.send(login);
    return;
  }
  const access = cookies.split("jwt=")[1].split(";")[0];

  jwt.verify(access, "secret", function (err, decoded) {
    if (err) {
      res.send(login);
    } else {
      res.redirect("/loggedIn");
    }
  });
});

router.get("/register", (req, res) => {
  const cookies = req.headers.cookie;
  if (!cookies || !cookies.includes("jwt=")) {
    res.send(register);
    return;
  }
  const access = cookies.split("jwt=")[1].split(";")[0];

  jwt.verify(access, "secret", function (err, decoded) {
    if (err) {
      res.send(register);
    } else {
      res.redirect("/loggedIn");
    }
  });
});

router.get("/loggedIn", (req, res) => {
  const cookies = req.headers.cookie;
  if (!cookies || !cookies.includes("jwt=")) {
    res.redirect("/login");
    return;
  }
  const access = cookies.split("jwt=")[1].split(";")[0];

  jwt.verify(access, "secret", function (err, decoded) {
    if (err) {
      res.redirect("/login");
    } else {
      res.send(loggedIn);
    }
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/login");
});

router.post("/register", (req, res) => {
  const { lastname, firstname, email, password } = req.body;
  bcrypt.hash(password, 10, function (err, hash) {
    Users.create({
      lastname,
      firstname,
      email,
      password: hash,
    })
      .then(async (user) => {
        console.log(user);
        // create access token
        const accessToken = await jwt.sign(
          { email: user.email, id: user.id },
          "secret"
        );
        res.cookie("jwt", accessToken);
        res.redirect("/loggedIn");
      })
      .catch((err) => {
        res
          .status(400)
          .send(
            register + "<br><br><p style='color:red'>Email already exists</p>"
          );
      });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res
      .status(404)
      .send(login + "<br><br><p style='color:red'>Email not found</p>");
    return;
  }
  Users.findOne({ where: { email } }).then((user) => {
    if (!user) {
      res
        .status(404)
        .send(login + "<br><br><p style='color:red'>Email not found</p>");
      return;
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        // create access token
        const accessToken = jwt.sign(
          { email: user.email, id: user.id },
          "secret"
        );
        res.cookie("jwt", accessToken);
        res.redirect("/loggedIn");
      } else {
        res
          .status(400)
          .send(login + "<br><br><p style='color:red'>Wrong password</p>");
      }
    });
  });
});

router.get("/", (req, res) => {
  res.send(home);
});

module.exports = router;
