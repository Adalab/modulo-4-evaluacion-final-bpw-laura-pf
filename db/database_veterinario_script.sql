CREATE DATABASE Veterinario;
USE Veterinario;

CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(60) NOT NULL
);

CREATE TABLE Animales (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    especie VARCHAR(45) NOT NULL,
    raza VARCHAR(45) NOT NULL,
	fk_usuario INT,
    FOREIGN KEY (fk_usuario) REFERENCES Usuarios(id)
);

INSERT INTO Usuarios (nombre, email, telefono, direccion)
VALUES 
('Laura Parra', 'lp@gmail.com', '668677994', 'Gran Via 4'),
('Jose Lopez', 'jl@gmail.com', '0987654321', 'Calle Baja 6');

INSERT INTO Animales (nombre, especie, raza, fk_usuario)
VALUES
('V', 'Perro', 'Mestizo', 1),  
('Bigotes', 'Gato', 'Siames', 2);

