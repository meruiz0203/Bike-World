const {  Bikes, Sizes, Colors, Brands, Categories, ModelsByBrand  } = require("../database/models"); 
const Sequelize = require("sequelize");


const productService = {

  getAllBikes: () => {
    return Bikes.findAll({
        include: [
            {
                model: ModelsByBrand,
                attributes: ['modelName'],
                as: 'ModelsByBrand',
            },
            {
                model: Categories,  // Agrega esta parte para incluir la asociación con Categories
                as: 'category',
                attributes: ['name'],  // Incluye solo la propiedad 'name'
            },
            {
                model: Sizes,
                as: 'size',
                attributes: ['name'],
            },
            {
                model: Colors,
                as: 'color',
                attributes: ['name'],
            },
            {
                model: Brands,
                as: 'brand',
                attributes: ['name'],
            },
        ],
    });
},

    getBike: (id) => {
      return Bikes.findByPk(id, {
        include: [{
          model: ModelsByBrand,
          attributes: ['modelName'], // Incluye solo la propiedad 'modelName'
          as: 'ModelsByBrand', // Alias para la relación
        },"brand", "category", "color", "size",  ],
      }).then((bike) => { 
        if (!bike) {
          return null; // Manejar el caso en que no se encuentra la bicicleta
        }
    
        return {
          id: bike.id, 
          ModelsByBrand: bike.ModelsByBrand ? { modelName: bike.ModelsByBrand.modelName } : null,
          // ModelsByBrand: bike.ModelsByBrand ? {name: bike.ModelsByBrand.modelName} : null,  ACA HICE UN CAMBIO QUIZAS SUSTANCIAL, VER SI LO DEMAS SIGUE FUNCIONANDO
          brand: bike.brand ? { id: bike.brand.id, name: bike.brand.name } : null,
          category: bike.category ? { id: bike.category.id, name: bike.category.name } : null,
          color: bike.color ? { id: bike.color.id, name: bike.color.name } : null,
          size: bike.size ? { id: bike.size.id, name: bike.size.name } : null,
          description: bike.description,
          price: bike.price,
          image: bike.image
        };
      });
    },
    
      createBike: async (bike, image) => { 
          

        const brand = await Brands.findByPk(bike.brand);
      
          // Asegúrate de que brand tenga un valor y brand.id sea accesible
          if (!brand || !brand.id) {
        
            return null;  // O maneja de otra manera la falta de marca
          }
          
      
          const [modelName, createdModel] = await ModelsByBrand.findOrCreate({
            where: { modelName: bike.modelName }, 
            defaults: { id_brand: brand.id },
          });
      
          const category = await Categories.findByPk(bike.category);

          // Asegúrate de que category tenga un valor y category.id sea accesible
          if (!category || !category.id) {
            return null;  // O maneja de otra manera la falta de categoría
          }
      
          const size = await Sizes.findByPk(bike.size);

          if (!size || !size.id){
            return null; 
          }
      
          const color = await Colors.findByPk(bike.color);
          if (!color || !color.id){
            return null; 
          }
          const newBike = await Bikes.create({
            id_model_name: modelName.id,
            id_category: category.id,
            id_size: size.id,
            id_brand: brand.id,
            id_color: color.id,
            description: bike.description,
            price: bike.price,
            image: image ? "http://localhost:3030/images/products/" + image.filename : null,
          });
      
          return newBike;
      
      },

      updateBikes: async (id, body, file) => { 
              const bike = await Bikes.findByPk(id, {
                  include: [
                      { model: ModelsByBrand, as: 'ModelsByBrand' },
                      { model: Brands, as: 'brand' },
                      { model: Categories, as: 'category' },
                      { model: Colors, as: 'color' },
                      { model: Sizes, as: 'size' },
                  ],
              });
      
              if (!bike) {
                  throw new Error('Bicicleta no encontrada');
              }
      
              // Actualizar o crear el modelo
              let model;
      
              // Verificar si el modelo existe en el cuerpo de la solicitud
              if (body.modelName) {
                  model = await ModelsByBrand.findOne({ where: { modelName: body.modelName } });
      
                  if (!model) {
                      // Si no existe, actualizar el modelo actual con el nuevo nombre (si existe)
                      if (bike.ModelsByBrand) {
                          bike.ModelsByBrand.modelName = body.modelName;
                          await bike.ModelsByBrand.save();
                      }
                  }
              }
      
              // Actualizar otros campos relacionados
              if (model) {
                  bike.id_model_name = model.id;
              }
      
              // Verificar y actualizar las otras relaciones
              if (body.brand) {
                  const brand = await Brands.findOne({ where: { name: body.brand } });
                  if (brand) {
                      bike.id_brand = brand.id;
                  }
              }
      
              if (body.size) {
                  const size = await Sizes.findOne({ where: { name: body.size } });
                  if (size) {
                      bike.id_size = size.id;
                  }
              }
      
              if (body.color) {
                  const color = await Colors.findOne({ where: { name: body.color } });
                  if (color) {
                      bike.id_color = color.id;
                  }
              }
      
              if (body.category) {
                  const category = await Categories.findOne({ where: { name: body.category } });
                  if (category) {
                      bike.id_category = category.id;
                  }
              }
      
              bike.description = body.description;
              bike.price = body.price;
      
              // Si se proporciona una nueva imagen, actualizarla
              if (file) {
                bike.image = file ? "http://localhost:3030/images/products/" + file.filename : null;
              }
      
              // Guardar los cambios en la base de datos
              await bike.save();
      
              return bike; // Devolver la bicicleta actualizada
          
          },

    destroyProduct: async (id) => {
      
      await Bikes.destroy({where: {id : id}} )

      return;
   
  },

    getBikesByCategory: async (categoryName) => {
          try {
            // Busca la categoría por nombre
            const category = await Categories.findOne({
              where: {
                name: categoryName,
              },
            });
      
            if (!category) {
              // La categoría no fue encontrada
              return [];
            }
      
            // Utiliza Sequelize para buscar las bicicletas de la categoría específica en la base de datos
            const bikes = await Bikes.findAll({
              where: {
                id_category: category.id, // Suponiendo que la relación entre Bikes y Categories se hace a través de la columna id_category
              }, 
              include: [
                {
                  model: ModelsByBrand,
                  as: 'ModelsByBrand', // Nombre de la relación en el modelo Bikes
                  attributes: ['modelName'], // Selecciona solo el nombre del modelo
                }
              ],
            });
      
            return bikes;
          } catch (error) {
            console.error('Error al obtener bicicletas por categoría:', error);
            throw error;
          } 
        },

    getAllCategories: () => {
      return Categories.findAll();
    }, 

    getAllSizes: () => {
      return Sizes.findAll();
    }, 

    getAllBrands: () => {
      return Brands.findAll();
    }, 

    getAllColors: () => {
      return Colors.findAll();
    }, 

    getAllModels: () => {
      return ModelsByBrand.findAll();
    }, 

    getAllBikesRandom: async () => {
      
        const bikes = await Bikes.findAll({
          order: Sequelize.literal('RAND()'), 
          limit: 3, 
          include: [
            {
              model: ModelsByBrand,
              attributes: ['modelName'],
              as: 'ModelsByBrand',
          },
          {
              model: Categories,  
              as: 'category',
              attributes: ['name'],  
          },
          {
              model: Sizes,
              as: 'size',
              attributes: ['name'],
          },
          {
              model: Colors,
              as: 'color',
              attributes: ['name'],
          },
          {
              model: Brands,
              as: 'brand',
              attributes: ['name'],
          },
          ],
        });
  
        return bikes; 
    },
    
  

    search: async (query) => {
      try {
        if (!query || query.trim() === '') {
          throw new Error('Completa el campo de búsqueda');
        }

        const bikes = await Bikes.findAll({
          where: {
            '$ModelsByBrand.modelName$': {
              [Sequelize.Op.like]: `%${query}%`,
            },
          },
          include: [
            {
              model: ModelsByBrand,
              as: 'ModelsByBrand',
              attributes: ['modelName'], 
            },
            {
              model: Categories,
              as: 'category',
              attributes: ['name'],
            },
            {
              model: Sizes,
              as: 'size',
              attributes: ['name'],
            },
            {
              model: Colors,
              as: 'color',
              attributes: ['name'],
            },
            {
              model: Brands,
              as: 'brand',
              attributes: ['name'],
            },
          ],
        });
    
        return bikes;
      } catch (error) {
        console.error('Error al buscar bicicletas:', error);
        throw error;
      }
    },
  }   

module.exports = productService;