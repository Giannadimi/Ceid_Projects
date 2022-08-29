const db = require("../Models");
const Location = db.Location;
const Op = db.Sequelize.Op;

// Create and Save a new Location
exports.create = (req, res) => {
    // Validate request
    console.log("[req]",req.body)
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Location
    const location = {
        heading: req.body.heading,
        velocity: req.body.velocity,
        accuracy: req.body.accuracy,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        timestampMs: req.body.timestampMs
    };
  
    // Save Location in the database
    Location.create(location)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Location."
        });
      });
  };

// Retrieve all Location from the database.
exports.findAll = (req, res) => {
 /*   Location.findAll({
        where: {
          location_id: 1
        }
      }).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving locations."
        });
    });*/

    db.sequelize.query(`SELECT * FROM Location`, {type: db.sequelize.QueryTypes.SELECT   }).then(result => {
      if (result.length > 0) {
        res.send(result)
      }else{
        res.send("No Data found")
      }
      console.log(result)
    });
};

// Find a single Location with an id
exports.findOne = (req, res) => {
  
};

// Update a Location by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Location with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Location from the database.
exports.deleteAll = (req, res) => {
  db.sequelize.query(`DELETE FROM Location`, {type: db.sequelize.QueryTypes.DELETE   }).then(result => {
    if (result.length == 0) {
      res.send("Successful locations delete!")
    }else{
      res.send("Some error occur during locations delete")
    }
  });
};
