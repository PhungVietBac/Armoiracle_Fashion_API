const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/user_ctrl");
const multer = require("multer");
const upload = multer();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Quản lý người dùng
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         iduser:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         gender:
 *           type: string
 *         avatar:
 *           type: string
 *         birthday:
 *           type: string
 *           format: date
 *         zodiac:
 *           type: integer
 *         weight:
 *           type: integer
 *         height:
 *           type: integer
 *         theme:
 *           type: integer
 *     UserCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *          type: string
 *         gender:
 *           type: integer
 *         avatar:
 *           type: string
 *         birthday:
 *           type: string
 *           format: date
 *         weight:
 *           type: integer
 *         height:
 *           type: integer
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/User"
 */
router.get("/", ctrl.getUsers);

/**
 * @swagger
 * /users/single/{field}:
 *  get:
 *    summary: Lấy người dùng theo trường tìm kiếm
 *    tags: [Users]
 *    parameters:
 *     - in: path
 *       name: field
 *       schema:
 *         type: string
 *         enum: [iduser, username, email, phone]
 *       required: true
 *     - in: query
 *       name: value
 *       schema:
 *         type: string
 *       required: true
 *    responses:
 *      200:
 *        description: Thông tin người dùng
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User"
 *      400:
 *        description: Yêu cầu không hợp lệ
 *      404:
 *        description: Không tìm thấy người dùng
 */
router.get("/single/:field", ctrl.getUserBy);

/**
 * @swagger
 * /users/multiple/{field}:
 *  get:
 *    summary: Lấy nhiều người dùng theo trường tìm kiếm
 *    tags: [Users]
 *    parameters:
 *     - in: path
 *       name: field
 *       schema:
 *         type: string
 *         enum: [gender, zodiac, weight, height]
 *       required: true
 *     - in: query
 *       name: value
 *       schema:
 *         type: string
 *       required: true
 *    responses:
 *      200:
 *        description: Danh sách thông tin người dùng
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/User"
 *      400:
 *        description: Yêu cầu không hợp lệ
 *      404:
 *        description: Không tìm thấy thông tin
 */
router.get("/multiple/:field", ctrl.getUsersBy);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tạo người dùng mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Đã thêm thành công người dùng
 */
router.post("/", ctrl.createUser);

/**
 * @swagger
 * /users/{id}/avatar:
 *   patch:
 *     summary: Cập nhật avatar người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *          schema:
 *           type: object
 *           properties:
 *             file:
 *               type: string
 *               format: binary
 *     responses:
 *       200:
 *         description: Đã cập nhật thành công người dùng
 */
router.patch("/:id/avatar", upload.single("file"), ctrl.updateAvatar);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       200:
 *         description: Đã cập nhật thành công người dùng
 */
router.put("/:id", ctrl.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Xoá người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Đã xoá
 */
router.delete("/:id", ctrl.deleteUser);

/**
 * @swagger
 * /users/{id}/styles:
 *   get:
 *     summary: Lấy danh sách các kiểu của người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách các kiểu của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Style"
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get("/:id/styles", ctrl.getStylesByUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
router.post("/login", ctrl.logIn);

router.get("/:id/recommend", ctrl.getRecommendClothesByUser);

router.get("/:id/clothes", ctrl.getAllClothesByUser);

module.exports = router;
