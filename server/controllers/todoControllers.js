
import Todos from '../models/Todos.js'; 

export const createTodo = async (req, res) => {
    try {
      const { task } = req.body;
  
      if(!task) {
        return res.status(400).json({ error: 'Task is required' });
      }
      const newTodo = await Todos.create({
        task,
        status: 'In progress',
        is_deleted: false,
      });
  
      res.status(201).json({
        message: 'Task created successfully',
        todo: newTodo,
      }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create todo' });
    }
  };

export const getTodos = async (req, res) => {
    try {
      const todos = await Todos.findAll({where: {
          is_deleted: false
      },
      order:[
          ['createdAt', 'DESC'],
      ]
      }); 
      res.status(200).json(todos); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  };

export const getTodoById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const todo = await Todos.findByPk(id); 
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      res.status(200).json(todo);  // Respond with the Todo item
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch todo' });
    }
  }

export const updateTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const { status, is_deleted } = req.body;
  
      const todo = await Todos.findByPk(id);  
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      // Update the Todo item
      todo.status = status || todo.status;
      todo.is_deleted = is_deleted !== undefined ? is_deleted : todo.is_deleted;
  
      await todo.save();  // Save the changes
  
      res.status(200).json(todo);  // Respond with the updated Todo
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update todo' });
    }
  }


