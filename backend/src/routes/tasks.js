import express from 'express';
import { body, param } from 'express-validator';
import { protect } from '../middleware/auth.js';
import { listTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.use(protect);

router.get('/', listTasks);

router.post(
  '/',
  [body('title').notEmpty().withMessage('Title is required'), body('dueDate').optional().isISO8601().toDate()],
  createTask
);

router.put(
  '/:id',
  [param('id').isMongoId(), body('title').optional().isString(), body('completed').optional().isBoolean(), body('dueDate').optional().isISO8601().toDate()],
  updateTask
);

router.delete('/:id', [param('id').isMongoId()], deleteTask);

export default router;
