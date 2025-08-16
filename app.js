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
//comment
app.use(express.json());

app.use("/api/v1/tasks", tasksRoutes);

module.exports = app;
