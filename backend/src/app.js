const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const app = express();  
const cookieParser = require("cookie-parser"); 
const userLogged = require('./middlewares/user-logged'); 
const apiProductsRouter = require("./routes/api/products")
const apiUsersRouter = require("./routes/api/users") 
const cors = require("cors");
const mainRoute = require("./routes/main-router");
const productRouter = require("./routes/products-router");
const userRouter = require("./routes/user-router"); 
const {userData} = require("./middlewares/user-data");
const {totalCart} = require("./middlewares/user-data");

app.use(
  cors()
  // (corsOptions = {
  //   origin: "*",
  // })
);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cookieParser());

app.use(
  session({
    // Configura express-session
    secret: "tuClaveSecreta",
    resave: false,
    saveUninitialized: false,
  })
);



app.use(userLogged); 
app.use(userData);
app.use(totalCart);


const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(apiUsersRouter);
app.use(productRouter);
app.use(mainRoute);
app.use(userRouter);
app.use(apiProductsRouter);
