const usersServices = require("../services/usersServices");

const userLoggedMiddleware = (req, res, next) => {
  res.locals.logueado = false;

  const emailCookie = req.cookies.userEmail;
  const userCookie = usersServices.getByEmail("email", emailCookie); 
  console.log(emailCookie);

  if(userCookie){
    req.session.userLogged = userCookie;
  }

  if(req.session.userLogged){
    res.locals.logueado= true; 
    res.locals.userLogged = req.session.userLogged;
  }

  next();
}

module.exports = userLoggedMiddleware;