# API de Veterinario

Este proyecto es una API para gestionar usuarios y animales en una base de datos de veretinaria. Está construida con Express y utiliza Swagger para la documentación de la API.

## Índice

- [Descripción](#descripción)
- [Requisitos](#Requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Descripción

La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre dos recursos principales: usuarios y animales. También permite obtener la relación entre animales y usuarios.

## Requisitos

- Node.js
- Expres.js
- MySQL

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/Adalab/modulo-4-evaluacion-final-bpw-laura-pf.git
   cd modulo-4-evaluacion-final-bpw-laura-pf
   ```

1. **Instala dependencias**

   ```bash
   npm install
   ```

## Configuracion

1. **Configura la base de datos MySQL**

La carpeta db contiene el script necesario para que puedas crear y modificar la base de datos.

## Uso

1. **Inicia el servidor**

```bash
  npm run dev
```

2. **Accede a la documentación API**
   Visita http://localhost:5002/api-doc en tu navegador para acceder la documentación generada por Swagger UI.

## Endpoints

Puedes acceder a los endpoint tipo GET a través del navegador, Para los demás métodos tendrás que usar Postman, poner http://localhost:5002/endpoint y ejecutarlo según el metodo. Podrás ver los resultados modificados en la base de datos y en tus endpoint tipo GET

**Obtener todos los usuarios**

- Método: `GET`
- Ruta: `/usuarios`
- Descripción: Obtiene una lista de todos los usuarios.

**Obtener todos los animales**

- Método: `GET`
- Ruta: `/animales`
- Descripción: Obtiene una lista de todos los animales.

**Obtener todos los animales y usuarios relacionados**

- Método: `GET`
- Ruta: `/animales-usuarios`
- Descripción: Obtiene una lista de todos los usuarios y los animales que tiene.

**Crea un nuevo usuario y animal**

- Método: `POST`
- Ruta: `/usuario-animal`
- Descripción: Crea un nuevo usuario y su animal
  -Cuerpo de la solicitud:
  Para probar este endpoint, poner en postman la ruta, el metodo y en el cuerpo:

  ```json
  {
    "name": "Nombre del usuario",
    "mail": "email@dominio.com",
    "phone": "123456789",
    "adress": "Dirección del usuario",
    "nameAnimal": "Nombre del animal",
    "specie": "Especie del animal",
    "breed": "Raza del animal"
  }
  ```

  **Respuesta exitosa**

  ```json
  {

  "status": true,
  "id":

  }
  ```

  Además puedes comprobarlo buscando en los endpoints anteriores tipo GET

  **Modificar usuarios**

- Método: `PUT`
- Ruta: `/usuario/id`
- Descripción: modifica una de las columnas o propiedades del usuario
  Para probar este endpoint, poner en postman la ruta (indicar el id del usuario que quieras modificar), el metodo y en el cuerpo la propiedad que desees modificar

  **Borrar usuario y su animal**

- Método: `DELETE`
- Ruta: `/usuario-animal/id`
- Descripción: elimina un usuario con su respectivo animal
  Para probar este endpoint, poner en postman la ruta (indicar el id del usuario del que quieres eliminar usuario y animal), no hace falta poner nada en el cuerpo

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE) en este repositorio.

MIT License

## Contacto

Para cualquier consulta, sugerencia o reporte de problemas, puedes ponerte en contacto con:

- [Laura Parra](https://github.com/laura-pf)
