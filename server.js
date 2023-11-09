const http = require("http");
const fs = require("fs");
const { registerUser, loginUser } = require("./auth");

const server = http.createServer((req, res) => {
  if (req.url === "/login" && req.method === "GET") {
    fs.readFile("./login.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error retrieving file");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/login" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const formData = new URLSearchParams(body);
      const username = formData.get("username");
      const password = formData.get("password");

      loginUser(username, password);
    });
  } else if (req.url === "/home.html") {
    // Serve the home.html file
    fs.readFile("./home.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error retrieving file");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
