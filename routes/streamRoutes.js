const express = require("express");
const {
  checkUserStream,
  getAllUserStreams,
} = require("../controller/streamController");

const router = express.Router();
router.post("/check-user-stream", checkUserStream);
router.get("/get-user-streams", getAllUserStreams);

module.exports = {
  routes: router,
};
