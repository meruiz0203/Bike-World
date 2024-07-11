const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
      "Users",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: ()=> uuidv4(),
          primaryKey: true, 
        },
        firstName: {
          field: "first_name",
          type: DataTypes.STRING,
        },
        lastName: {
          field: "last_name",
          type: DataTypes.STRING,
        },
        email: {
          field: "email",
          type: DataTypes.STRING,
        },
        birthday: {
          field: "birthday",
          type: DataTypes.DATE,
        },
        phone: {
          field: "phone",
          type: DataTypes.STRING,
        },
        password: {
          field: "password",
          type: DataTypes.STRING,
        },
        avatar: {
          field: "avatar",
          type: DataTypes.STRING,
        },
        address: {
          field: "address",
          type: DataTypes.STRING,
        },
        role: {
          type: DataTypes.INTEGER,
          defaultValue: 0, role: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // 0 para usuario común, 1 para administrador
          },
        },
      },
      {
        tableName: "users",
        timestamps: false,
      }
    );
  
  
    return Model;
  };

