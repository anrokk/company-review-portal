import swaggerJSDoc from "swagger-jsdoc";
import { version } from "../../package.json";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Company Review Portal API",
            version,
            description: "API documentation for the application, a platform for sharing interview and application process experiences.",
            contact: {
                name: "Andreas Erich Rokk",
                url: "https://github.com/anrokk/company-review-portal"
            }
        },
        servers: [
            {
                url: "http://localhost:50001",
                description: "Development server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" }
                    }
                }
            }
        }
    }
}