import express from 'express';
import path from 'path';
import sequelize from './sequelize.js';  
import Todos from './models/Todos.js';  

const app = express();
const port = 3000;

// Hardcoded absolute path to the build folder
const buildPath = path.resolve('C:/Users/Servo/Documents/Express/todo_react/client/build');

// Middleware to parse JSON bodies
app.use(express.json());

// Sync Sequelize with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

// CREATE: Add a new Todo
app.post('/todos', async (req, res) => {
  try {
    const { task } = req.body;


    const newTodo = await Todos.create({
      task,
      status: 'In progress',
      is_deleted: false,
    });

    res.status(201).json(newTodo); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// READ: Get all Todos
app.get('/todos', async (req, res) => {
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
});

// READ: Get a single Todo by ID
app.get('/todos/:id', async (req, res) => {
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
});

// UPDATE: Update a Todo by ID
app.put('/todos/:id', async (req, res) => {
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
});


// Serve static files from the React app build folder
app.use(express.static(buildPath));

// Catch-all route to serve the React app's index.html
app.get('*', (req, res) => {
    const filePath = path.resolve(buildPath, 'index.html');
    console.log("Resolved file path:", filePath); // Log for debugging

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(500).send('Something went wrong');
        } else {
            console.log("index.html sent successfully");
        }
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
