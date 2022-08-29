module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("File", {
      file_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
            
      },
      size:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
      filename: {
        type: Sequelize.STRING
      },
      uploading_timestamp: {
        type: Sequelize.DATE, 
      },    
      id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',//use plurilization
            key: 'user_id'
        } 
     }
    },
    {
      freezeTableName: true,
      timestamps: false

    });
  
    return File;
  };