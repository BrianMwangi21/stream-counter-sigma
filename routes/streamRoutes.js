const express = require("express");
const { checkUserStream } = require("../controller/streamController");

const router = express.Router();
router.post("/check-user-stream", checkUserStream);

module.exports = {
  routes: router,
};
