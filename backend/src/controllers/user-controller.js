const userServices = require("../services/usersServices");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

module.exports = {
  showLogin: (req, res) => {
    const errors = req.session.errors;
    delete req.session.errors;
    res.render("login", { errors });
  },

  login: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("login", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    try {
      const user = await userServices.getByEmail(req.body.email);

      if (!user || user.length == 0) {
        return res.render("login", {
          errors: {
            email: {
              msg: "Este email no se encuentra registrado",
            },
          },
          oldData: req.body,
        });
      }

      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        user.password
      );



      if (!passwordMatch) {
        return res.render("login", {
          errors: {
            password: {
              msg: "La contraseña es incorrecta",
            },
          },
          oldData: req.body,
        });
      } else {
        // Asignar el rol según la dirección de correo electrónico
        user.role = user.email.endsWith("@bikeworld.com") ? 1 : 0;

        req.session.userData = user;
        if (req.body.recordame){
          res.cookie('userEmail', req.body.email, { maxAge: 1000 * 30 })
        }
        return res.redirect("/");
      }
    } catch (error) {
      console.error("Error al obtener usuario por email:", error);
      res.status(500).send("Error al obtener usuario por email");
    }
  },

  userList: async (req, res) => {
    const users = await userServices.getAllUsers();
    console.log(users);
    res.render("users-list", { users });
  },

  userDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await userServices.getUser(id);
      if (!user) {
        return res
          .status(404)
          .render("error", { message: "Usuario no encontrado" });
      }
      res.render("user-detail", { user });
    } catch (error) {
      res.status(500).send("Error al obtener usuario por ID");
    }
  },

  register: async (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthday: req.body.birthday,
      password: bcrypt.hashSync(req.body.password, 5),
      phone: req.body.phone,
      address: req.body.address,
      avatar: req.file
        ? "http://localhost:3030/images/users/" + req.file.filename
        : null,
    };

    const errors = req.session.errors;

    if (errors) {
      return res.render("register", {
        errors,
        oldData: req.session.oldData || {},
      });
    }

    const checkEmail = await userServices.getByEmail(req.body.email);

    if (checkEmail && checkEmail.length > 0) {
      req.session.errors = {
        email: {
          msg: "Este email se encuentra registrado",
        },
      };
      req.session.oldData = req.body;
      return res.redirect("/register");
    }

    await userServices.createUser(user);
    return res.redirect("/");
  },

  registerForm: (req, res) => {
    const errors = req.session.errors;
    delete req.session.errors;
    res.render("register", { errors });
  },

  logout: (req, res) => {
    res.clearCookie("recordame");
    req.session.destroy();
    return res.redirect("/");
  },

  profileEdit: async (req, res) => {
    const errors = req.session.errors;
    delete req.session.errors;
    const id = req.params.id;
    const user = await userServices.getUser(id);
    res.render("user-profile-edit-form", { user, errors });
  },

  profile: (req, res) => {
    return res.render("profile", { userData: req.session.userData });
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const userData = req.body;

      // Verificar si se proporcionó una nueva contraseña
      if (userData.password) {
        // Hashear la nueva contraseña
        const hashedPassword = bcrypt.hashSync(userData.password, 5);
        // Asignar la contraseña hasheada al objeto del usuario
        userData.password = hashedPassword;
      }

      // Llamar al servicio para actualizar el usuario
      await userServices.updateUser(id, userData);

      res.redirect("/");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      res.status(500).send("Error al actualizar usuario");
    }
  },

  destroy: async (req, res) => {
    try {
      const id = req.params.id;
      await userServices.destroyUser(id);
      res.redirect("/");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      res.status(500).send("Error al eliminar usuario");
    }
  },
};
