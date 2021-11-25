const swaggerJSDoc = require("swagger-jsdoc");
const { koaSwagger } = require('koa2-swagger-ui');

const config = require('../config/openapi');

const options = {
  definition: config,
  apis: ['./controllers/*.js']
};

const openapiSpecification = swaggerJSDoc(options);

function openapi(ctx, next) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = openapiSpecification;
}

const swagger = koaSwagger({
  hideTopbar: true,
  swaggerOptions: {
    url: 'openapi.json'
  }
});

module.exports = { openapi, swagger };
