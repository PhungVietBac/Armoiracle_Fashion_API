const express = require("express");
const userRoutes = require("./routes/user_route");
const styleRoutes = require("./routes/style_route");
const userStyleRoutes = require("./routes/user_style_route");
const questionRoutes = require("./routes/question_route");
const answerRoutes = require("./routes/answer_route");
const clothesRoutes = require("./routes/clothes_route");
const clothesStyleRoutes = require("./routes/clothes_style_route");
const { swaggerUi, specs } = require("./swagger");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // ← đây là đường dẫn docs
app.use("/users", userRoutes);
app.use("/styles", styleRoutes);
app.use("/user_styles", userStyleRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/clothes", clothesRoutes);
app.use("/clothes_style", clothesStyleRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
  console.log(`Docs available at http://localhost:${port}/api-docs`);
});
