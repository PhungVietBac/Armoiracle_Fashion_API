const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/clothes_ctrl");
const multer = require("multer");
const upload = multer();

/**
 * @swagger
 * tags:
 *   - name: Clothes
 *     description: Quản lý quần áo
 * components:
 *   schemas:
 *     Clothes:
 *       type: object
 *       properties:
 *         idcloth:
 *           type: string
 *         name:
 *           type: string
 *         size:
 *           type: string
 *         color:
 *           type: string
 *         material:
 *           type: string
 *         brand:
 *           type: string
 *         weather:
 *           type: string
 *         type:
 *           type: string
 *     ClothesCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         picture:
 *           type: string
 *         size:
 *           type: string
 *         color:
 *           type: string
 *         material:
 *           type: string
 *         brand:
 *           type: string
 *         weather:
 *           type: string
 *         type:
 *           type: string
 */

/**
 * @swagger
 * /clothes:
 *   get:
 *     summary: Lấy danh sách quần áo
 *     tags: [Clothes]
 *     responses:
 *       200:
 *         description: Danh sách quần áo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clothes'
 */
router.get("/", ctrl.getAllClothes);

/**
 * @swagger
 * /clothes/{id}:
 *   get:
 *     summary: Lấy thông tin quần áo theo ID
 *     tags: [Clothes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của quần áo
 *     responses:
 *       200:
 *         description: Thông tin quần áo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clothes'
 */
router.get("/:id", ctrl.getClothesbyID);

/**
 * @swagger
 * /clothes/by/{field}:
 *   get:
 *     summary: Lấy danh sách quần áo theo trường cụ thể
 *     tags: [Clothes]
 *     parameters:
 *       - in: path
 *         name: field
 *         required: true
 *         schema:
 *           type: string
 *         description: Trường để lọc quần áo (name, size, color, material, brand, weather, type)
 *       - in: query
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: Giá trị của trường để lọc
 *     responses:
 *       200:
 *         description: Danh sách quần áo theo trường cụ thể
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clothes'
 */
router.get("/by/:field", ctrl.getClothesBy);

/**
 * @swagger
 * /clothes:
 *   post:
 *     summary: Tạo mới quần áo
 *     tags: [Clothes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClothesCreate'
 *     responses:
 *       201:
 *         description: Quần áo đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clothes'
 */
router.post("/", ctrl.createClothes);

/**
 * @swagger
 * /clothes/{id}/styles:
 *   get:
 *     summary: Lấy danh sách phong cách quần áo theo ID
 *     tags: [Clothes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của quần áo để lấy phong cách
 *     responses:
 *       200:
 *         description: Danh sách phong cách quần áo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClothesStyle'
 */
router.get("/:id/styles", ctrl.getStylesByClothes);

router.patch("/:id/picture", upload.single("file"), ctrl.upload);

router.delete("/:id", ctrl.deleteClothes);

module.exports = router;
