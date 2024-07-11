const { body } = require("express-validator"); /* podriamos usar check tambien */
const path =require ("path")

module.exports = [ 
    body("modelName")
    .notEmpty()
    .withMessage("Debe completar este campo")
    .isLength ({min:5})
    .withMessage("Debe tener minimo 5 caracteres"),
    body("description")
    .isLength ({min:20})
    .withMessage("Debe tener minimo 20 caracteres"),
    body("image").custom((value, { req }) => {
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

    
