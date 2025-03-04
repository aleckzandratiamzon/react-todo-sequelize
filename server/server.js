import express from 'express';
import path from 'path';
import sequelize from './sequelize.js';  
import TodoRoutes from './routes/todoRoutes.js';

const app = express();
const port = 3001;

const buildPath = path.resolve('C:/Users/Servo/Documents/Express/sequelize-todo/client/build');
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

// Import the TodoRoutes and add a prefix (optional but recommended)
app.use('/api', TodoRoutes); 

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
