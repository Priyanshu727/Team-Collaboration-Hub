const express = require('express');
const { createTask, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Create a new task
router.post('/tasks', authMiddleware, roleMiddleware(['Admin']), createTask);

// Update an existing task
router.put('/tasks/:id', authMiddleware, roleMiddleware(['Admin']), updateTask);

// Delete a task
router.delete('/tasks/:id', authMiddleware, roleMiddleware(['Admin']), deleteTask);

// Get a single task by ID
// router.get('/tasks/:id', authMiddleware, getTask);

// Get all tasks
// router.get('/tasks', authMiddleware, getAllTasks);

module.exports = router;
