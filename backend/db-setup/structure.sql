DROP DATABASE IF EXISTS bike_world_db;
CREATE DATABASE bike_world_db;
USE bike_world_db;

-- Tabla Marca
CREATE TABLE brands (
    id CHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla Tamaño
CREATE TABLE sizes (
    id CHAR(36) NOT NULL,
    size VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla Color
CREATE TABLE colors (
    id CHAR(36) NOT NULL,
    color VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla de Categorias
CREATE TABLE categories (
    id CHAR(36) NOT NULL,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla Modelos por Marca
CREATE TABLE models_by_brand (
    id CHAR(36) NOT NULL,
    id_brand CHAR(36) NOT NULL,
    modelName VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_brand) REFERENCES brands (id)
);

-- Tabla Bicicleta
CREATE TABLE bikes (
    id CHAR(36) NOT NULL,
    id_model_name CHAR(36) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    id_brand CHAR(36) NOT NULL,
    id_size CHAR(36) NOT NULL,
    id_color CHAR(36) NOT NULL,
    image VARCHAR(255) NOT NULL, 
    id_category CHAR(36) NOT NULL,
    PRIMARY KEY (id), 
    FOREIGN KEY (id_brand) REFERENCES brands(id),
    FOREIGN KEY (id_size) REFERENCES sizes(id), 
    FOREIGN KEY (id_color) REFERENCES colors(id), 
    FOREIGN KEY (id_category) REFERENCES categories(id),
    FOREIGN KEY (id_model_name) REFERENCES models_by_brand(id)  
);

-- Tabla Usuario
CREATE TABLE users (
    id CHAR(36) NOT NULL,
    first_name VARCHAR(255) NOT NULL, 
    last_name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    birthday VARCHAR(255) NOT NULL, 
    phone VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    avatar varchar(200) DEFAULT NULL, 
    address varchar(200) DEFAULT NULL,
    role varchar(200) DEFAULT 0,
    PRIMARY KEY (id)
);
