const userData = require("../middlewares/user-data");
const productService = require("../services/productServices");

module.exports = {

  home: async (req, res) => {
      
    const bikes = await productService.getAllBikesRandom(); 
    res.render('home', { bikes : bikes });
  
},
  

};  