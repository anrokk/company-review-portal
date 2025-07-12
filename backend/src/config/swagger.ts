import swaggerJSDoc from "swagger-jsdoc";
import { version } from "../../package.json";

const swaggerOptions: swaggerJSDoc.Options = {
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
                        id: { type: "string", format: "uuid" },
                        username: { type: "string" },
                        email: { type: "string", format: "email" },
                        role: { type: "string", enum: ["user", "admin"] },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" }
                    }
                },
                Company: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        name: { type: "string" },
                        is_approved: { type: "boolean" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" }
                    }
                },
                Review: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid" },
                        user_id: { type: "string", format: "uuid" },
                        company_id: { type: "string", format: "uuid" },
                        rating: { type: "integer", minimum: 1, maximum: 5},
                        role_applied_for: { type: "string" },
                        experience_text: { type: "string" },
                        was_ghosted: { type: "boolean" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" }
                    }
                }
            }
        }
    },
    apis: ['./src/api/*.ts']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;