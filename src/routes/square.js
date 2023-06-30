const express = require("express");
const router = express.Router();
const square = require("../lib/square");

router.get("/square/:nb", (req, res) => {
  const nb = req.params.nb;
  res.send(square(parseInt(nb)).toString());
});

module.exports = router;
