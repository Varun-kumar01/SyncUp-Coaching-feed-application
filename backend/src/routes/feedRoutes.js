const express = require("express");

const {
  getFeeds,
  createFeed,
} = require("../controllers/feedController");

const router = express.Router();

router.get("/", getFeeds);

router.post("/", createFeed);

module.exports = router;