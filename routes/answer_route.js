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

/**
 * @swagger
 * /answers/{id}/styles:
 *   get:
 *     summary: Lấy phong cách theo ID câu trả lời
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách phong cách cho câu trả lời
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Style'
 */
router.get("/:id/styles", ctrl.getStylesByAnswer);
module.exports = router;
