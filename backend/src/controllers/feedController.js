const pool = require("../config/db");

const redisClient = require("../config/redis");


// GET FEEDS
const getFeeds = async (req, res) => {
  try {
    // CHECK CACHE
    const cachedFeeds = await redisClient.get("feeds");

    if (cachedFeeds) {
      console.log("Serving from Redis");

      return res.json(JSON.parse(cachedFeeds));
    }

    // FETCH FROM DB
    const result = await pool.query(
      "SELECT * FROM feeds ORDER BY created_at DESC"
    );

    // STORE IN REDIS
    await redisClient.set(
      "feeds",
      JSON.stringify(result.rows)
    );

    console.log("Serving from PostgreSQL");

    res.json(result.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch feeds",
    });
  }
};


// POST FEED
const createFeed = async (req, res) => {
  try {
    console.log("TRIGGERED")
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        message: "Title and message required",
      });
    }

    const result = await pool.query(
      `INSERT INTO feeds (title, message)
       VALUES ($1, $2)
       RETURNING *`,
      [title, message]
    );

    const newFeed = result.rows[0];

    // CLEAR CACHE
    await redisClient.del("feeds");

    // SOCKET EMIT
    const io = req.app.get("io");

    io.emit("new-feed", newFeed);

    res.status(201).json(newFeed);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create feed",
    });
  }
};

module.exports = {
  getFeeds,
  createFeed,
};