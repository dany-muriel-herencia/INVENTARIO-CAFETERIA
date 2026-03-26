CREATE DATABASE IF NOT EXISTS inventario_cafeteria;
USE inventario_cafeteria;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS lotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS productos (
    id INT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_caducidad BIGINT NOT NULL,
    peso DECIMAL(10, 2) NOT NULL,
    lote_id INT NULL,
    CONSTRAINT fk_productos_lote
        FOREIGN KEY (lote_id) REFERENCES lotes(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE INDEX idx_productos_nombre ON productos(nombre);
CREATE INDEX idx_productos_fecha_caducidad ON productos(fecha_caducidad);
CREATE INDEX idx_productos_lote_id ON productos(lote_id);
CREATE INDEX idx_lotes_categoria ON lotes(categoria);
