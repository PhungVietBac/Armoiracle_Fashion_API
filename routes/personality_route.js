const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/personality_ctrl');

/**
 * @swagger
 * tags:
 *   - name: Personality
 *     description: Quản lý tính cách và phong cách
 * components:
 *   schemas:
 *     Personality:
 *       type: object
 *       properties:
 *         idpersonality:
 *           type: string
 *         name:
 *           type: string
 *     Style:
 *       type: object
 *       properties:
 *         idstyle:
 *           type: string
 *         name:
 *           type: string
 */

/**
 * @swagger
 * /personalities:
 *   get:
 *     summary: Lấy danh sách tất cả personality
 *     tags: [Personality]
 *     responses:
 *       200:
 *         description: Danh sách personality
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personality'
 */
router.get("/", ctrl.getAllPersonalities);

/**
 * @swagger
 * /personalities/{id}:
 *   get:
 *     summary: Lấy thông tin personality theo ID
 *     tags: [Personality]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của personality
 *     responses:
 *       200:
 *         description: Thông tin personality
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personality'
 *       404:
 *         description: Không tìm thấy personality
 */
router.get('/:id', ctrl.getPersonalityById);

/**
 * @swagger
 * /personalities/{id}/styles:
 *   get:
 *     summary: Lấy danh sách styles theo personality ID
 *     tags: [Personality]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của personality
 *     responses:
 *       200:
 *         description: Danh sách style tương ứng với personality
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Style'
 */
router.get('/:id/styles', ctrl.getStylesByPersonalityId);

/**
 * @swagger
 * /personalities/styles:
 *   get:
 *     summary: Lấy toàn bộ styles
 *     tags: [Personality]
 *     responses:
 *       200:
 *         description: Danh sách style
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Style'
 */
router.get('/styles/all', ctrl.getAllStyles);

module.exports = router;
