const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const { getJobs } = require("./Services/server");
const cors = require("cors");
//server.use("/", cors());
server.use("/https://jobs.github.com", cors());
let PORT = 3000;
if (process.env.PORT !== undefined) {
  PORT = process.env.PORT;
}
server.listen(PORT, () => {
  console.log("LISTENING...PORT:" + PORT);
});

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const jobs = [
  { title: "sde", salary: 1000 },
  { title: "data scientist", salary: 2000 },
];
server.get("/jobs", (req, res) => {
  console.log(jobs);
  res.json(jobs);
});

server.get("/https://jobs.github.com/positions.json", (req, res) => {
  console.log(req.query);
  getJobs(req.query.description).then((x) => {
    res.json(x.data);
  });
});
