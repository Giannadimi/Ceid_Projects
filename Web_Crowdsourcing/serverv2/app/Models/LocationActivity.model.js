const db = require("../Models");

const Activity = db.Activity;
const Location = db.Location;
module.exports = (sequelize, Sequelize) => {

    const LocationToActivity = sequelize.define("LocationToActivity", {
      id_location: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Location', //use plurilization
            key: 'location_id'
        }
    },
      id_activity: {
        
            type: Sequelize.INTEGER,
            references: {
                model: 'Activity',//use plurilization
                key: 'activity_id'
            }      
  },


    },{
      freezeTableName: true,
      timestamps: false
    });
  
    
    return LocationToActivity;
  };