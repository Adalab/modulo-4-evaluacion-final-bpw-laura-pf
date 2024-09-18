const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const swaggerConfig = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");

require("dotenv").config(); // para las variables de entorno

// crear el servidor
const app = express();

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "veterinario",
  });
  connection.connect();
  return connection;
}

// configuro el servidor
app.use(cors());
app.use(express.json());

const port = 5002;
app.listen(port, () => {
  console.log(`Server is listening in http://localhost:${port}`);
});

// Endpoints
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerConfig));

//obtener usuarios
app.get("/usuarios", async (req, res) => {
  /*
        - conecto a la DB
        - consulta a la DB. READ (SELECT)
        - cierro conexión a la DB
        - responder con los usuarios
    */

  const connection = await getDBConnection();
  const query = "SELECT * FROM usuarios";
  const [result] = await connection.query(query);

  connection.end();

  res.status(200).json({
    status: "success",
    results: result,
  });
});

// Obtener todos los animales
app.get("/animales", async (req, res) => {
  /*
        - conecto a la DB
        - consulta a la DB. READ (SELECT)
        - cierro conexión a la DB
        - responder con los animales
    */

  const connection = await getDBConnection();
  const query = "SELECT * FROM animales";
  const [result] = await connection.query(query);

  connection.end();

  res.status(200).json({
    status: "success",
    results: result,
  });
});

app.get("/animales-usuarios", async (req, res) => {
  /*
        - Conecto a la DB
        - Consulto a la DB. READ (SELECT con JOIN)
        - Cierro conexión a la DB
        - Respondo con la relación de animales y usuarios
    */

  // Obtener la conexión a la base de datos
  const connection = await getDBConnection();

  // Consulta para obtener la relación de animales y usuarios sin alias
  const query = `
    SELECT 
      animales.id AS animal_id,
      animales.nombre AS animal_nombre,
      animales.especie AS animal_especie,
      animales.raza AS animal_raza,
      usuarios.id AS usuario_id,
      usuarios.nombre AS usuario_nombre,
      usuarios.email AS usuario_email
    FROM 
      animales
    JOIN 
      usuarios ON animales.fk_usuario = usuarios.id;
  `;

  // Ejecutar la consulta
  const [result] = await connection.query(query);

  // Cerrar la conexión
  connection.end();

  // Enviar la respuesta
  res.status(200).json({
    status: "success",
    results: result,
  });
});

app.post("/usuario-animal", async (req, res) => {
  /*
        - recoger los usuarios que me envía frontend (body params)
        - abro conexión
        - consulta CREATE (INSERT INTO)
        - cierro conexión
        - respondo
    */
  const { name, mail, phone, adress } = req.body;
  const { nameAnimal, specie, breed } = req.body;

  const connection = await getDBConnection();
  const UserQuery =
    "INSERT INTO usuarios (nombre, email, telefono, direccion) VALUES(?, ?, ?, ?)";
  const [userResult] = await connection.query(UserQuery, [
    name,
    mail,
    phone,
    adress,
  ]);
  const idNewUser = userResult.insertId;

  const animalQuery =
    "INSERT INTO animales (nombre, especie, raza, fk_usuario) VALUES(?, ?, ?, ?)";
  const [animalResult] = await connection.query(animalQuery, [
    nameAnimal,
    specie,
    breed,
    idNewUser,
  ]);

  connection.end();

  res.status(201).json({
    status: "success",
    id: animalResult.insertId,
  });
});

// actualizar un usuario que ya existe
app.put("/usuario/:id", async (req, res) => {
  const id = req.params.id; // url params
  const { name, mail, phone, adress } = req.body; // nuevos campos en body params
  const connection = await getDBConnection();

  if (name) {
    const queryName = "UPDATE usuarios SET nombre = ? WHERE id = ?";
    const [resultName] = await connection.query(queryName, [name, id]);
  }
  if (mail) {
    const queryMail = "UPDATE usuarios SET email = ? WHERE id = ?";
    const [resultMail] = await connection.query(queryMail, [mail, id]);
  }
  if (phone) {
    const queryPhone = "UPDATE usuarios SET telefono = ? WHERE id = ?";
    const [resultPhone] = await connection.query(queryPhone, [phone, id]);
  }
  if (adress) {
    const queryAdress = "UPDATE usuarios SET direccion = ? WHERE id = ?";
    const [resultAdress] = await connection.query(queryAdress, [phone, id]);
  }

  connection.end();

  res.json({
    status: "success",
    message: "Usuario actualizado",
  });
});

// eliminar un usuario

app.delete("/usuario-animal/:id", async (req, res) => {
  const id = req.params.id;
  const connection = await getDBConnection();

  // Primero elimino los animales asociados al usuario con su fk
  const deleteAnimalsQuery = "DELETE FROM animales WHERE fk_usuario = ?";
  await connection.query(deleteAnimalsQuery, [id]);

  // Luego elimino al usuario
  const deleteUserQuery = "DELETE FROM usuarios WHERE id = ?";
  const [result] = await connection.query(deleteUserQuery, [id]);

  connection.end();

  if (result.affectedRows > 0) {
    res.status(200).json({
      status: "success",
      message: "Recurso eliminado",
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Recurso no encontrado",
    });
  }
});
