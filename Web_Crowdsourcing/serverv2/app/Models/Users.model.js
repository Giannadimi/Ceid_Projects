module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "Users",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      firstname: {
        type: Sequelize.STRING,
        unique: true,
      },

      lastname: {
        type: Sequelize.STRING,
        unique: true,
      },

      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        //validation need here
      },
      e_mail: {
        type: Sequelize.STRING,
        allowNull: false,
        //validation need here
      },
      role: {
        type: Sequelize.ENUM("Admin", "User"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Users;
};
