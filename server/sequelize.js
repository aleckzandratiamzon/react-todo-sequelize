import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('react_todo', 'root', 'Servoaleck16.', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
