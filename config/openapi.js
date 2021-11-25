require('dotenv').config();

module.exports = {
  openapi: "3.0.0",
  info: {
    title: process.env.npm_package_name,
    version: process.env.npm_package_version,
    description: 'OpenAPI Server',
    contact: {
      name: "Support",
      email: "support@example.com"
    }
  },
  servers: [
    { url: `${process.env.DEV_HOST}:${process.env.PORT}/`, description: "Development server" },
    { url: `${process.env.PROD_HOST}:${process.env.PORT}/`, description: "Production server" }
  ],
  components: {
    securitySchemes: {
      JwtAuth: {
        type: 'http',
        description: 'Authentication by JWT token.',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{
    JwtAuth: []
  }]
};
