const express = require("express"); //requerir solamente ROUTER de express
const upload = require("../middlewares/multer");
const userController = require("../controllers/user-controller");
const usersRouter = express.Router();
const validations = require("../validaciones/login-validation");
const registerValidations = require("../validaciones/register-validation"); /* quizas una sola validacion alcance para las dos */
const validateForm = require("../middlewares/validate-form");
// Rutas para la lista y detalle de usuarios
usersRouter.get("/", userController.userList);
usersRouter.get("/detail/:id", userController.userDetail);
//..

// Rutas para el inicio de sesión
usersRouter.get("/login", userController.showLogin);
usersRouter.post(
  "/login",
  validations,
  validateForm("/login"),
  userController.login
);
usersRouter.get("/logout", userController.logout);

// Rutas para el registro de usuarios
usersRouter.get("/register", userController.registerForm);
usersRouter.post(
  "/register",
  upload.single("avatar"),
  registerValidations,
  validateForm("/register"),
  userController.register
);
// Rutas para eliminar, ver perfil y editar usuario
usersRouter.delete("/:id", userController.destroy);
usersRouter.get("/:id", userController.profile);
usersRouter.get("/:id/user", userController.profileEdit);
usersRouter.put("/:id/edit", upload.single("avatar"), userController.update);

module.exports = usersRouter;
