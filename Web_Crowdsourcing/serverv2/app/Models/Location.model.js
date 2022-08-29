module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("Location", {
      location_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
            
      },
      heading: {
        type: Sequelize.STRING,
        allowNull:true
      },
      velocity: {
        type: Sequelize.INTEGER,
        allowNull:true

      },
      accuracy: {
        type: Sequelize.INTEGER,
        allowNull:true

      },
      longitude: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      timestampMs: {
        type: Sequelize.DATE, 
    },
    },
    {
      freezeTableName: true,
      timestamps: false

    });
  
    return Location;
  };