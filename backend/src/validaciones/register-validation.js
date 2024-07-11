const { body } = require("express-validator"); /* podriamos usar check tambien */ 
const path = require('path');

module.exports = [ 
    body("firstName")
    .notEmpty()
    .withMessage("Debe completar este campo"),
    body("lastName") 
    .notEmpty()
    .withMessage("Debe completar este campo"),
    body("birthday")
    .notEmpty()
    .withMessage("Debe completar este campo"),
    body("address")
    .notEmpty()
    .withMessage("Debe completar este campo"),
    body("email")
    .notEmpty()
    .withMessage("Debe completar este campo") 
    .bail() 
    .isEmail() 
    .withMessage("Debe ser un email valido "),
    body("password")
    .notEmpty()
    .withMessage("Debe completar este campo") 
    .isLength({ min: 6 }),
    body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]
