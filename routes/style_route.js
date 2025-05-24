const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/style_ctrl");

/**
 * @swagger
 * tags:
 *   - name: Styles
 *     description: Quản lý phong cách
 * components:
 *   schemas:
 *     Style:
 *       type: object
 *       properties:
 *         idstyle:
 *           type: string
 *         style:
 *           type: string
 */

/**
 * @swagger
 * /styles:
 *  get:
 *    summary: Lấy danh sách phong cách
 *    tags: [Styles]
 *    responses:
 *      200:
 *        description: Danh sách phong cách
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Style'
 *      500:
 *        description: Lỗi server
 */
router.get("/", ctrl.getStyles);

/**
 * @swagger
 * /styles/{id}:
 *  get:
 *    summary: Lấy phong cách theo ID
 *    tags: [Styles]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID của phong cách
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Phong cách tìm thấy
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Style'
 *      404:
 *        description: Phong cách không tìm thấy
 *      500:
 *        description: Lỗi server
 */
router.get("/:id", ctrl.getStyleById);

/**
 * @swagger
 * /styles/name/{name}:
 *  get:
 *    summary: Lấy phong cách theo tên
 *    tags: [Styles]
 *    parameters:
 *      - in: path
 *        name: name
 *        required: true
 *        description: Tên của phong cách
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Phong cách tìm thấy
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Style'
 *      404:
 *        description: Phong cách không tìm thấy
 *      500:
 *        description: Lỗi server
 */
router.get("/name/:name", ctrl.getStyleByName);

/**
 * @swagger
 * /styles:
 *  post:
 *    summary: Tạo phong cách mới
 *    tags: [Styles]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              style:
 *                type: string
 *    responses:
 *      201:
 *        description: Phong cách được tạo thành công
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Style'
 *      409:
 *        description: Phong cách đã tồn tại
 *      500:
 *        description: Lỗi server
 */
router.post("/", ctrl.createStyle);

module.exports = router;
