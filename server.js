const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, async () => {
  await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
  console.log(`App listening on port ${PORT}!`);
});
