const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API with Supabase",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // Đọc mô tả API từ file route
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
