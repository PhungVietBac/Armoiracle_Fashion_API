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
        url: "https://armoiracle-fashion-api.onrender.com", // Đường dẫn đến API
        //url: "http://localhost:4000", // Đường dẫn đến API trong môi trường phát triển
      },
    ],
  },
  apis: ["./routes/*.js"], // Đọc mô tả API từ file route
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
