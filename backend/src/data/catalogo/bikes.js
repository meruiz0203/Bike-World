
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");


module.exports = {
    getBikes: function () {
        const productsFilePath = path.join(__dirname, "./bikes.json");
        const bikes = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        return bikes;
      },
    
    saveBikes : (bikes) => {
      const bikesFilePath = path.join(__dirname, "./bikes.json");
      fs.writeFileSync(bikesFilePath, JSON.stringify(bikes, null, 2));
    }, 

    findAll: function () {
      return this.getBikes();
    }, 

    findById: function (id) {
      const product = this.getBikes().find((product) => product.id == id);
      return product;
    },

    create: function (product) {
      console.log(`Creating product ${product.nombre}`);
      const products = this.getBikes();
      const newProduct = {
        id: uuidv4(),
        ...product,   // el resto de las propiedades del producto (sin contar el nuevo id que se le da)
      };
      products.push(newProduct);
      this.saveBikes(products);
      
    },

    update: function(id, product){
      console.log(`updating produc ${product.nombre}`);
      const products = this.getBikes();
      const productToEdit = products.find( (product) => product.id == id );
      Object.assign(productToEdit, product) // ESTUDIAR ESTO https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      this.saveBikes(products);
      return product;
    },

    destroy: function(id){
      console.log(`Destroying produc ${id}`);
      const products = this.getBikes();
      const nonDestroyedBikes = products.filter( (product) => product.id != id );
      this.saveBikes(nonDestroyedBikes);
    },

    filterCategory: function(categoria){
      const products = this.getBikes();
      const productosFiltrados = products.filter(product => product.categoria === categoria);
      return productosFiltrados;
    },
    
} 

