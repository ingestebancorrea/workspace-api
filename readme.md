# Workspace - Backend

Este es el backend para la aplicación de gestión de proyectos. Proporciona una API RESTful que permite a los usuarios interactuar con proyectos, tareas y etiquetas.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Licencia](#licencia)

## Características

- Registro y autenticación de usuarios
- Creación y gestión de proyectos
- Envío y recepción de tareas
- Roles de usuario (Ej. Product Owner, Desarrollador)
- Manejo de errores y validaciones de datos

## Tecnologías

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework para construir aplicaciones web en Node.js.
- **Sequelize**: ORM para manejar bases de datos SQL.
- **PostgreSQL**: Base de datos relacional.
- **JWT**: Para autenticación y autorización.
- **Swagger**: Documentación de la API.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ingestebancorrea/streaming-classes-back.git

2. Navega al directorio del proyecto:
cd streaming-virtual-classes-backend

3. Instala las dependencias:
npm install

4. Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias. Un ejemplo de archivo .env:
    ```bash
    DB_HOST=host
    DB_USERNAME=username
    DB_PASSWORD=password
    DB_DATABASE=database
    DB_PORT=5432

    PORT=3001
    SECRET_JWT_SEED=tu_secreto

## Uso
Para iniciar el servidor, utiliza el siguiente comando:
    npm run start

## Endpoints
Puedes consultar todos los endpoints disponibles en la API accediendo a http://host:port/api-docs.

## Licencia
Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.