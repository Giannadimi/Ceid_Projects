const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const upload = require("express-fileupload");

//Importing Database Models
const db = require("./app/Models");

db.sequelize.sync();

//db.sequelize.sync({ force: true }); //DROP IF DATABASE Exists

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//uploading middleware
app.use(upload());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//Importing routes
//require("./app/Routes/Location.routes")(app);
//require("./app/Routes/Users.routes")(app);

require("./app/Routes/Location.routes")(app);
require("./app/Routes/Users.routes")(app);
require("./app/Routes/Activity.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
