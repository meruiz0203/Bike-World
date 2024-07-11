const isAdmin = (req, res, next) => {
  const user = req.session.userData
    if (user.role == 1 ) {
      res.locals.isAdmin = true;
    } else {
      res.locals.isAdmin = false; 
     res.redirect('/')
    }
    next();
};

module.exports = {
  isAdmin,
};
