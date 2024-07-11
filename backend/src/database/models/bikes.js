const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "Bikes",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      id_model_name: {
        field: "id_model_name",
        type: DataTypes.STRING,
      },
      id_category: {
        field: "id_category",
        type: DataTypes.STRING,
      },
      id_size: {
        field: "id_size",
        type: DataTypes.STRING,
      },
      id_brand: {
        field: "id_brand",
        type: DataTypes.STRING,
      },
      id_color: {
        field: "id_color",
        type: DataTypes.STRING,
      },
      description: {
        field: "description",
        type: DataTypes.STRING,
      },
      price: {
        field: "price",
        type: DataTypes.DECIMAL,
      },
      image: {
        field: "image",
        type: DataTypes.STRING
      }
    },
    { 
      tableName: "bikes",
      timestamps: false,
    }
  );

  // Relaciones acá
  Model.associate = (db) => {
    Model.belongsTo(db.Brands, {
      as: "brand",
      foreignKey: 'id_brand'
    });

    Model.belongsTo(db.Sizes, {
      as: "size",
      foreignKey: 'id_size'
    });

    Model.belongsTo(db.Colors, {
      as: "color",
      foreignKey: 'id_color'
    });

    Model.belongsTo(db.Categories, {
      as: "category",
      foreignKey: 'id_category'
    });

    Model.belongsTo(db.ModelsByBrand, {
      as: "ModelsByBrand",
      foreignKey: 'id_model_name', 
      onDelete: 'CASCADE',
    });
  };

  return Model;
};