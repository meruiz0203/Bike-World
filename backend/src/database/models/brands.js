const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Brands",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: () => uuidv4(),
                primaryKey: true,
            },
            name: {
                field: "name",
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { 
        tableName: "brands",
        timestamps: false,
         });

    Model.associate = (db) => { 
        Model.hasMany(db.ModelsByBrand, {
            as: "models",
            foreignKey: 'id_brand'
        }); 
    };

    return Model;
};