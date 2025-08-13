const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
    dueDateTime: {
      type: Date,
      required: [true, 'Due date and time is required'],
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Task', taskSchema);
