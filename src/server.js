const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // 서버에 socket.io를 연결

io.on("connection", (socket) => {
  console.log("새로운 클라이언트가 연결됐어");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // 모든 클라이언트에게 메시지 전송
  });

  socket.on("disconnect", () => {
    console.log("클라이언트가 연결을 끊었어");
  });
});

server.listen(3000, () => {
  console.log("서버가 3000번 포트에서 듣고 있어");
});
