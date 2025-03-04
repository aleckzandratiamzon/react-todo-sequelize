import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';  

const Todos = sequelize.define('Todos', {
  task: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
       args: /^[a-zA-Z0-9., ]+$/,
       msg: "Task can only contain letters, numbers, commas, and spaces.",
      },
      len: [1,100],
      notNull: true,
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,  
    allowNull: false,
    defaultValue: false,
  },
}, {
  
});

export default Todos;
