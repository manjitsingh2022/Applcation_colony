const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const SocietyMemberModel = require('./models/societyMemberModel');
const NoticeModel = require('./models/noticeModel');
const MaintenanceRequestModel = require('./models/maintenanceRequestModel');
const HouseModel = require('./models/houseModel');
const EventModel = require('./models/eventModel');

function createApp() {
    const app = express();

    // Function to dynamically generate Swagger schemas for Mongoose models
    function generateSchemas() {
        const schemas = {};

        // Define your models and their corresponding Swagger schema names
        const models = [
            { model: User, schemaName: 'User' },
            { model: SocietyMemberModel, schemaName: 'SocietyMemberModel' },
            { model: NoticeModel, schemaName: 'NoticeModel' },
            { model: MaintenanceRequestModel, schemaName: 'MaintenanceRequestModel' },
            { model: HouseModel, schemaName: 'HouseModel' },
            { model: EventModel, schemaName: 'EventModel' },
        ];

        // Generate schemas for each model
        models.forEach(({ model, schemaName }) => {
            const schema = {};
            const paths = model.schema.paths;

            for (const key in paths) {
                schema[key] = { type: paths[key].instance };
            }

            schemas[schemaName] = {
                type: 'object',
                properties: schema,
            };
        });

        return schemas;
    }

    // Swagger options configuration
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            // securityDefinitions: {
            //     JWT: {
            //         type: 'apiKey',
            //         name: 'Authorization',
            //         in: 'header',
            //     },
            // },

            info: {
                title: 'Colony API Documentation',
                version: '1.0.0',
                description: 'API documentation for Colony project',
            },
            servers: [{ url: 'http://localhost:5000/app/', description: 'Local Development' }],
            components: {
                schemas: generateSchemas(),
            },
        },
        apis: [],
        // basePath: '/',
    };

    // Loop through your route files and add them to the 'apis' array
    const routesDir = path.join(__dirname, 'routes'); // Adjust the path to your routes directory
    console.log(routesDir, 'Dir')
    const routeFiles = fs.readdirSync(routesDir);

    routeFiles.forEach((file) => {
        if (file.endsWith('.js')) {
            swaggerOptions.apis.push(path.join(routesDir, file));
        }
    });

    const specs = swaggerJsdoc(swaggerOptions);

    // Serve Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    return app;
}

module.exports = createApp;
