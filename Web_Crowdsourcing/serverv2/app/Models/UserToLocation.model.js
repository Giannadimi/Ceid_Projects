const db = require("../Models");

const Activity = db.Activity;
const Location = db.Location;
module.exports = (sequelize, Sequelize) => {
  const UserToLocation = sequelize.define(
    "UserToLocation",
    {
      id_location: {
        type: Sequelize.INTEGER,
        references: {
          model: "Location", //use plurilization
          key: "location_id",
        },
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", //use plurilization
          key: "user_id",
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return UserToLocation;
};
