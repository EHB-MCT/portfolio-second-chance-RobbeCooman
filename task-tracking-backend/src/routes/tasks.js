const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await db('tasks').select('*');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const { title, description, deadline } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const [newTask] = await db('tasks')
      .insert({ title, description, deadline })
      .returning('*');
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT (update) a task
router.put('/:id', async (req, res) => {
  const taskId = req.params.id;
  const { title, description, deadline } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const [updatedTask] = await db('tasks')
      .where('id', taskId)
      .update({ title, description, deadline })
      .returning('*');

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await db('tasks').where('id', taskId).del();

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single task by ID
router.get('/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await db('tasks').where('id', taskId).first();

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
