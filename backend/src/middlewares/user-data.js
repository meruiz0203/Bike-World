const userData = (req, res, next) => {
    const userData = req.session.userData; 
    res.locals.userData = userData; 
    next();
  } 
  const totalCart = (req, res, next) => {
    const cartProducts = req.session.cart || [];
    let total = 0;
  
    if (cartProducts.length > 0) {
      total = cartProducts.reduce((acc, product) => acc + product.productPrice, 0);
    }
  
    res.locals.total = total;
    next(); 
  };

module.exports = {
  userData, 
  totalCart,
};

