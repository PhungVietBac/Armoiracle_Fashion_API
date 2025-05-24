const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/user_style_ctrl");

/**
 * @swagger
 * tags:
 *   - name: UserStyles
 *     description: Quản lý phong cách của người dùng
 * components:
 *   schemas:
 *     UserStyle:
 *       type: object
 *       properties:
 *         iduser:
 *           type: string
 *         idstyle:
 *           type: string
 */

/**
 * @swagger
 * /user_styles:
 *  post:
 *    summary: Tạo phong cách mới cho người dùng
 *    tags: [UserStyles]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserStyle'
 *    responses:
 *      201:
 *        description: Phong cách mới của người dùng đã được tạo
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserStyle'
 *      409:
 *        description: Phong cách của người dùng đã tồn tại
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.post("/", ctrl.createUserStyle);

/**
 * @swagger
 * /user_styles:
 *  delete:
 *   summary: Xóa phong cách của người dùng
 *   tags: [UserStyles]
 *   parameters:
 *    - in: query
 *      name: iduser
 *      required: true
 *      description: ID của người dùng
 *      schema:
 *        type: string
 *    - in: query
 *      name: idstyle
 *      required: true
 *      description: ID của phong cách cần xóa
 *      schema:
 *        type: string
 *   responses:
 *     204:
 *       description: Phong cách đã được xóa
 *     404:
 *       description: Phong cách không tồn tại
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 */
router.delete("/", ctrl.deleteUserStyle);

module.exports = router;
