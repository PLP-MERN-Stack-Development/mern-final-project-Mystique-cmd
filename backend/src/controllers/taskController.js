import Task from '../models/Task.js';
import { validationResult } from 'express-validator';

export async function listTasks(req, res) {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ tasks });
}

export async function createTask(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { title, dueDate } = req.body;
  const task = await Task.create({ user: req.user._id, title, dueDate });
  req.app.get('io')?.emit('task:created', { task });
  res.status(201).json({ task });
}

export async function updateTask(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { id } = req.params;
  const updates = {};
  if (req.body.title !== undefined) updates.title = req.body.title;
  if (req.body.completed !== undefined) updates.completed = req.body.completed;
  if (req.body.dueDate !== undefined) updates.dueDate = req.body.dueDate;
  const task = await Task.findOneAndUpdate({ _id: id, user: req.user._id }, updates, { new: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  req.app.get('io')?.emit('task:updated', { task });
  res.json({ task });
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  req.app.get('io')?.emit('task:deleted', { id });
  res.json({ success: true });
}
