Cliente de Base de Datos:
Abre tu cliente de base de datos (DBeaver) y conéctate a la base de datos que estás utilizando en tu aplicación.
Copia y pega el comando ALTER TABLE users ADD COLUMN role INT DEFAULT 0;
en el campo de consulta y ejecútalo.
Esto añadirá la nueva columna role a tu tabla de usuarios.
agregar en el archivo database/models/user.js
role: {
type: DataTypes.INTEGER,
defaultValue: 0, // 0 para usuario común, 1 para administrador
},
