const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../../package.json");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'REST API Docs',
            version
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['../routes/*.routes.js'] // Adjust the extension based on your file type
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    // Serve Swagger UI at /docs
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Serve Swagger JSON at /docs.json
    app.get('/docs.json', (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;