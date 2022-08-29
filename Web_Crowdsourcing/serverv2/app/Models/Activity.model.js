module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("Activity", {
     activity_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
      },
      timestampMs: {
        type: Sequelize.DATE, 
        allowNull: true
    },
      nested_activity: {
        type: Sequelize.JSON,
        //allowNull: false
        //validation need here
      },
      /*role:{
          type: Sequelize.ENUM('IN_VEHICLE', 'ON_BICYCLE', 'RUNNING', 'STILL', 'TILTING', 'UNKNOWN', 'WALKING'),
          allowNull: false
      }*/
     
    },{
      freezeTableName: true,
      
        timestamps: false
    }
    );
  
    return Activity;
  };
