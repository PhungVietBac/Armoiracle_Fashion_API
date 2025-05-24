const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/answer_ctrl");

/**
 * @swagger
 * tags:
 *   - name: Answers
 *     description: API cho các câu trả lời
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       properties:
 *         idans:
 *           type: string
 *         answer:
 *           type: string
 */

/**
 * @swagger
 * /answers:
 *   get:
 *     summary: Lấy danh sách câu trả lời
 *     tags: [Answers]
 *     responses:
 *       200:
 *         description: Danh sách câu trả lời
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 */
router.get("/", ctrl.getAnswers);

module.exports = router;
