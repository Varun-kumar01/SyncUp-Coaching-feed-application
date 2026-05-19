require("dotenv").config();

const http = require("http");

const app = require("./app");

const { Server } = require("socket.io");

const setupSocket = require("./socket/socket");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://YOUR-VERCEL-URL.vercel.app"
    ]
  },
});

setupSocket(io);

app.set("io", io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});