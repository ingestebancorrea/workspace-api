const express = require('express');
const cors = require('cors');
require('dotenv').config()
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require("./swagger.json");
const db = require('./src/database/config');

//Crear el servidor de express
const app = express();

// Use CORS middleware
app.use(cors());

// Base de datos
db.connect();

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Lectura y Parseo del Body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/project', require('./src/routes/project'));
app.use('/api/task', require('./src/routes/task'));
app.use('/api/label', require('./src/routes/label'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Running on port ${ process.env.PORT }`);
});