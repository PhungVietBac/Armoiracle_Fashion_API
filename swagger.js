const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fashion App API with Supabase",
      version: "1.0.0",
    },
    servers: [
      {
        url: `https://armoiracle-fashion-api.onrender.com:${PORT}`, // Đường dẫn đến API
      },
    ],
  },
  apis: ["./routes/*.js"], // Đọc mô tả API từ file route
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
