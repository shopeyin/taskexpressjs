const express = require("express");
const taskController = require("./../controllers/taskController");
const router = express.Router();

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createATask);

router
  .route("/:id")
  .get(taskController.getATask)
  .patch(taskController.updateATask)
  .delete(taskController.deleteATask);

module.exports = router;
