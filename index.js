const express = require("express");
const userRoutes = require("./routes/user_route");
const { swaggerUi, specs } = require("./swagger");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // ← đây là đường dẫn docs

const port = 5000;
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
  console.log(`Docs available at http://localhost:${port}/api-docs`);
});
