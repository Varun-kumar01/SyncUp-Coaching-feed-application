const express = require("express");
const cors = require("cors");

const feedRoutes = require("./routes/feedRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/feed", feedRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "SYNCUP Backend Running",
  });
});

module.exports = app;