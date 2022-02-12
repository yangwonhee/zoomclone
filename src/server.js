import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const handleListen = () => console.log("Listening on http://localhost:3000");

// ws server on http server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

/*
// this socket means browser(frontend)
function handleConnection(socket) {
  console.log(socket);
}
*/

// if you had a result of message <Buffer ...> => console.log(message.toString("utf-8"))
wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from the browser"));
  socket.on("message", (message) => {
    console.log(message.toString("utf-8"));
  });
  socket.send("hello!!!");
});

server.listen(3000, handleListen);
