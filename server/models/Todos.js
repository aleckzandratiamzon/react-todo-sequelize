import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';  // Your sequelize instance

const Todos = sequelize.define('Todos', {
  task: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9.,]+$/,
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
  // Additional model options (optional)
});

export default Todos;
