import express from 'express';
import { createTodo, getTodoById, getTodos, updateTodo } from '../controllers/todoControllers.js';


const router = express.Router();

// CREATE: Add a new Todo
router.post('/todos', createTodo);
  
  // READ: Get all Todos
router.get('/todos', getTodos);
  
  // READ: Get a single Todo by ID
router.get('/todos/:id', getTodoById);
  
  // UPDATE: Update a Todo by ID
router.put('/todos/:id', updateTodo);

export default router;