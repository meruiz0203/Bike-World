const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Sizes",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: () => uuidv4(),
                primaryKey: true,
            },
                name:{
                field: "size",
                type: DataTypes.STRING,
             },
              },
        { 
        tableName: "sizes",
        timestamps: false,
         });

//Relaciones acá 
Model.associate = (db) => {
Model.hasMany(db.Bikes, { 
    as:"bikes",
    foreignKey: 'id_size' });
};
    return Model;
     };
