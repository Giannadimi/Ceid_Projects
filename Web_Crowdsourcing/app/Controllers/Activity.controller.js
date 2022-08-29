const db = require("../Models");
const Activity = db.Activity;
const Op = db.Sequelize.Op;

// Create and Save a new Location
exports.create = (req, res) => {
  // Validate request
  console.log("[req]", req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Location
  const activity = {
    nested_activity: req.body.activity,
    timestampMs: req.body.timestampMs,
  };

  console.log("nested_activity", activity.nested_activity[0]);
  console.log(
    "timestamps",
    new Date(parseInt(activity.timestampMs)).toISOString()
  );
  console.log(`'${JSON.stringify(activity.nested_activity)}'`);
  // Save Location in the database
  db.sequelize
    .query(
      `INSERT INTO "Activity"(nested_activity,"timestampMs") VALUES(:nested_activity::json,:timestampMs) RETURNING activity_id`,
      {
        replacements: {
          nested_activity: JSON.stringify(activity.nested_activity),
          timestampMs: new Date(parseInt(activity.timestampMs)).toISOString(),
        },
        type: db.sequelize.QueryTypes.INSERT,
      }
    )
    .then(() => {
      res.status(200).send("Activity Created");
    })
    .catch((err) => {
      res.status(500).send("Some error occurred while creating the activity");
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

  db.sequelize
    .query(`SELECT * FROM Activity`, { type: db.sequelize.QueryTypes.SELECT })
    .then((result) => {
      console.log("[activity][result]", result);
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No Activities Data found");
      }
    });
};

// Delete all Location from the database.
exports.deleteAll = (req, res) => {
  db.sequelize
    .query(`DELETE FROM Activity`, { type: db.sequelize.QueryTypes.DELETE })
    .then((result) => {
      if (result.length == 0) {
        res.send("Successful activities delete!");
      } else {
        res.send("Some error occur during activities delete");
      }
    });
};
