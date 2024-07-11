const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Colors",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: () => uuidv4(),
                primaryKey: true,
            }, 
            
            name:{
                field: "color",
                type: DataTypes.STRING,
             },
              },
        { 
        tableName: "colors",
        timestamps: false,
         });

//Relaciones acá
Model.associate = (db) => {
Model.hasMany(db.Bikes, { 
    as: "color",
    foreignKey: 'id_color' }); 
};

    return Model;
     };
