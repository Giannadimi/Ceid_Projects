const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0, // change this to zero

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/*DB Models */
db.Location = require("./Location.model.js")(sequelize, Sequelize);
db.Users = require("./Users.model.js")(sequelize, Sequelize);
db.Activity = require("./Activity.model.js")(sequelize, Sequelize);
db.LocationToActivity= require("./LocationActivity.model.js")(sequelize, Sequelize);
db.UserToLocation = require("./UserToLocation.model.js")(sequelize, Sequelize); 
db.File = require("./File.model.js")(sequelize, Sequelize); 

module.exports = db;