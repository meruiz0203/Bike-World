const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Categories",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: () => uuidv4(),
                primaryKey: true,
            },
            
            name:{
                field: "category",
                type: DataTypes.STRING,
             },
              },
        { 
        tableName: "categories",
        timestamps: false,
         });

Model.associate = (db) => {
Model.hasMany(db.Bikes, {
    as: "category",
    foreignKey: 'id_category' });
};
    return Model;
     };
