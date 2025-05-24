const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/question_ctrl");

/**
 * @swagger
 * tags:
 *   - name: Questions
 *     description: API cho các câu hỏi
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         idques:
 *           type: string
 *         question:
 *           type: string
 */

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Lấy danh sách câu hỏi
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Danh sách câu hỏi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
router.get("/", ctrl.getQuestions);

/**
 * @swagger
 * /questions/{id}/answers:
 *   get:
 *     summary: Lấy câu trả lời theo ID câu hỏi
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách câu trả lời cho câu hỏi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 */
router.get("/:id/answers", ctrl.getAnswersByQuestion);
module.exports = router;
