/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     responses:
 *       200:
 *         description: Thành công
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Tạo người dùng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã tạo
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xoá người dùng theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Đã xoá
 */

const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/user_ctrl");

router.get("/", ctrl.getUsers);
router.post("/", ctrl.createUser);
router.delete("/:id", ctrl.deleteUser);

module.exports = router;
