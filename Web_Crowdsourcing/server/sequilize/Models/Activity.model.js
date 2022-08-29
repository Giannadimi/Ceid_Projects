const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('Activity', {
   
		location_id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		heading: {
			allowNull: true,
			type: DataTypes.STRING,
        },
        velocity: {
			allowNull: true,
			type: DataTypes.INTEGER,
        },
        accuracy: {
			allowNull: true,
			type: DataTypes.INTEGER,
		},
        longitude: {
			allowNull: true,
			type: DataTypes.STRING,
        },
        latitude: {
			allowNull: true,
			type: DataTypes.STRING,
        },
        timestampMs:{
            allowNull:true,
            type: 'TIMESTAMP',
        
        }
        
	});
};
