const Task = require('../models/taskModel');

// Create a task
exports.createTask = async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;
  try {
    const task = await Task.create({ 
        title,
        description,
        assignedTo,
        dueDate,
        createdBy: req.user._id 
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
