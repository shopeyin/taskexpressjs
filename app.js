const express = require("express");
const tasksRoutes = require("./routes/task");
const logger = require("morgan");
const app = express();

if (process.env.NODE_ENV === "development") {
  console.log("IN DEVELOPMENT");
  app.use(logger("dev"));
} else {
  console.log("IN PRODUCTION");
}

app.use(express.json());

app.use("/api/v1/task", tasksRoutes);

module.exports = app;
