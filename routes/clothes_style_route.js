const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/clothes_style_ctrl');
/**
 * @swagger
 * tags:
 *   - name: ClothesStyle
 *     description: Quản lý phong cách quần áo
 * components:
 *   schemas:
 *     ClothesStyle:
 *       type: object
 *       properties:
 *         idcloth:
 *           type: string
 *         idstyle:
 *           type: string
 */

/**
 * @swagger
 * /clothes_style:
 *   post:
 *     summary: Thêm phong cách quần áo mới
 *     tags: [ClothesStyle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClothesStyle'
 *     responses:
 *       201:
 *         description: Phong cách quần áo đã được tạo thành công
 */
router.post('/', ctrl.createClothesStyle);

/**
 * @swagger
 * /clothes_style:
 *   delete:
 *     summary: Xóa phong cách quần áo
 *     tags: [ClothesStyle]
 *     parameters:
 *       - in: query
 *         name: idcloth
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của quần áo để xóa phong cách
 *       - in: query
 *         name: idstyle
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của phong cách để xóa
 *     responses:
 *       200:
 *         description: Phong cách quần áo đã được xóa thành công
 */
router.delete('/', ctrl.deleteClothesStyle);

module.exports = router;