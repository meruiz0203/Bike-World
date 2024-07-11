const userData = require("../middlewares/user-data");
const productService = require("../services/productServices");

module.exports = {

  productDetailBikes: (req, res) => {
    productService.getBike(req.params.id).then((bike) => {
      res.render("product-detail-bikes", { bike });
    });
  },

  productListBikes: (req, res) => {
    productService.getAllBikes().then((bikes) => {
      res.render("product-list-bikes", { bikes });
    });
  },

  //Render Create
  productCreate: async (req, res) =>{ 
      try {
        const brands = await productService.getAllBrands();
        const sizes = await productService.getAllSizes();
        const colors = await productService.getAllColors();
        const categories = await productService.getAllCategories();
        const models = await productService.getAllModels();
        const errors= req.session.errors || { };
        delete req.session.errors;


        res.render("product-create-form", { brands, sizes, colors, categories, models, errors });
      } catch (error) {
        // Manejar errores
        console.error(error);
        res.status(500).send("Error interno del servidor");
      }
    },


  productCart: (req, res) => { 
    console.log(req.session,); 
    const data = req.session.userData; 
    const cartProducts = req.session.cart || []; 
    let total = 0; 
     if (cartProducts.length > 0) {
    total = cartProducts.reduce((acc, product) => acc + product.productPrice, 0);
  }
      res.render("product-cart", {
        email: data.email, 
        password: data.password,
        total: req.session.total,
        cartProducts, 
        headerTotal: total,
      }); 
    },
      
    addToCart: (req, res) => {
      console.log(req.body, "SOy el bodyyyyy")
      const productId = req.body.productId;
      const productBrand = req.body.productBrand;
      const productModel = req.body.productModelsByBrand;
      const productColor = req.body.productColor;
      const productPrice = parseFloat(req.body.productPrice);
      const productSize = req.body.productSize;
      const productImage = req.body.productImage;
      const productCategory = req.body.productCategory;
       
       if (!req.session.cart) {
        req.session.cart = [];
      }
    
      const cartProducts = req.session.cart || [];

        cartProducts.push({
        productId,
        productBrand,
        productModel,
        productColor,
        productPrice,
        productSize,
        productImage,
        productCategory,
                     
      });

      const total = cartProducts.reduce((acc, product) => acc + product.productPrice, 0);
      req.session.total = total;

       res.render("product-cart", {cartProducts, total});
    },


    removeProduct: (req, res) => {
      const productIdToRemove = req.body.productId;

  // Filtrar el carrito para excluir el producto que se va a eliminar
  req.session.cart = req.session.cart.filter(product => product.productId !== productIdToRemove);

  // Recalcular el total
  const total = req.session.cart.reduce((acc, product) => acc + product.productPrice, 0);
  req.session.total = total;

  // Redirigir a la página del carrito
  res.redirect('/product-cart');


    },

    emptyCart: (req, res) => {
      const cartProducts= req.session.cart = [];
      total = req.session.total = 0;
      res.render("product-cart", {cartProducts:[], total:0});
    },
    
    payCart: (req, res) => { 
      const data = req.session.userData; 
      const cartProducts = req.session.cart || [];
        res.render("payment", {
          email: data.email, 
          password: data.password,
          total: req.session.total,
          cartProducts
        }); 
    },

    deliveryCart: (req, res) => { 
         res.render("delivery"); 
    },

  //Create Post
  productStoreBikes: (req, res) => {
    productService.createBike(req.body, req.file).then((bike) => {
      res.redirect("/bikes");
    });
  },

  productEdit: (req, res) => {
    // Aca obtenes la bici que vas a editar, mediante el id
    productService.getBike(req.params.id).then((bike) => {
      const brandsPromise = productService.getAllBrands();
      const sizesPromise = productService.getAllSizes();
      const colorsPromise = productService.getAllColors();
      const categoriesPromise = productService.getAllCategories();
      const modelsPromise = productService.getAllModels();
      const errors = req.session.errors || {};
      delete req.session.errors;

      // Espera a que todas las promesas se resuelvan antes de renderizar la vista
      Promise.all([
        brandsPromise,
        sizesPromise,
        colorsPromise,
        categoriesPromise,
        modelsPromise,
      ]).then(([brands, sizes, colors, categories, models]) => {
        res.render("product-edit-form", {
          bike,
          categories,
          brands,
          sizes,
          colors,
          models,
          errors,
        });
      });
    });
  },

  update: (req, res) => {
    productService
      .updateBikes(req.params.id, req.body, req.file)
      .then((bike) => {
        res.redirect("/bikes");
      });
  },

  destroy: (req, res) => {
    productService.destroyProduct(req.params.id).then(() => {
      res.redirect("/bikes");
    });
  },

  filterCategory: async (req, res) => {
    const category = req.params.category;
    const bikes = await productService.getBikesByCategory(category);
    res.render("product-category", { bikes, category });
  },

  search: async (req, res) => {
    try {
      const keywords = req.query.search;

      if (!keywords || keywords.trim() === "") {
        alert("Completa el campo de búsqueda");
      }

      const foundBikes = await productService.search(keywords);
    
      res.render("results", { bikes: foundBikes });
    } catch (error) {
      console.error("Error al procesar la búsqueda:", error);
      res.status(500).send("Error interno del servidor");
    }
  },
};
