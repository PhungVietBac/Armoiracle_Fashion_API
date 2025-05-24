const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fashion App API with Supabase",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000", // Đường dẫn đến API
      },
    ],
  },
  apis: ["./routes/*.js"], // Đọc mô tả API từ file route
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
