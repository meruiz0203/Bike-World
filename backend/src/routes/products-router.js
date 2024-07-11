const express = require("express");
const upload = require("../middlewares/multer");
const productsRouter = express.Router();
const userGuard = require("../middlewares/user-guard");
const validateForm = require("../middlewares/validate-form");
const createEditValidation = require("../validaciones/create-edit-product");
const { isAdmin } = require("../middlewares/auth"); // Importa el middleware de autorización

const productController = require("../controllers/product-controller");
const { validate } = require("uuid");

// Rutas públicas (accesibles para todos)

productsRouter.get("/bikes", productController.productListBikes);
productsRouter.get("/bikes/:id", productController.productDetailBikes);
productsRouter.get("/search", productController.search);
productsRouter.get(
  "/bikes/category/:category",
  productController.filterCategory
);
productsRouter.get("/bikes/id:", productController.filterCategory);

// Rutas protegidas (requieren autenticación)
productsRouter.get("/cart", userGuard, productController.productCart);
productsRouter.post("/cart", userGuard, productController.addToCart)
productsRouter.get("/empty", userGuard, productController.emptyCart )
productsRouter.get("/remove", userGuard, productController.removeProduct )
productsRouter.get("/pay", userGuard, productController.payCart )
productsRouter.get("/delivery", productController.deliveryCart )

// Rutas para administradores
productsRouter.get("/create", isAdmin, productController.productCreate);
productsRouter.post(
  "/bikes",
  isAdmin,
  upload.single("image"),
  createEditValidation,
  validateForm("/create"),
  productController.productStoreBikes
);

productsRouter.get("/edit/:id", isAdmin, productController.productEdit);
productsRouter.put(
  "/bikes/:id",
  isAdmin,
  upload.single("image"),
  createEditValidation,
  validateForm("/edit/:id"),
  isAdmin,
  productController.update
);

productsRouter.delete("/bikes/delete/:id", isAdmin, productController.destroy);

module.exports = productsRouter;
