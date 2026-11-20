
import { Router } from "express";

import WalletController from "../controllers/wallet.controller.js";
import WalletService from "../../application/use-cases/wallet.service.js";
import WalletMySQLRepository from "../../infrastructure/database/mysql/wallet.mysql.repository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Dependency Injection
const walletRepository = new WalletMySQLRepository();
const walletService = new WalletService(walletRepository);
const walletController = new WalletController(walletService);

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Wallets
 *   description: Gestión de billeteras
 */

/**
 * @swagger
 * /wallets:
 *   get:
 *     summary: Obtener todas las billeteras del sistema y del usuario
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de billeteras obtenida exitosamente
 */
router.get("/", authMiddleware, walletController.getWallets);

/**
 * @swagger
 * /wallets:
 *   post:
 *     summary: Crear una nueva billetera personalizada
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Billetera personal"
 *               description:
 *                 type: string
 *                 example: "Mi billetera principal"
 *     responses:
 *       201:
 *         description: Billetera creada exitosamente
 */
router.post("/", authMiddleware, walletController.createWallet);

/**
 * @swagger
 * /wallets/{id}:
 *   put:
 *     summary: Actualizar una billetera personalizada
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Billetera actualizada exitosamente
 */
router.put("/:id", authMiddleware, walletController.updateWallet);

/**
 * @swagger
 * /wallets/{id}:
 *   delete:
 *     summary: Eliminar una billetera personalizada
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Billetera eliminada exitosamente
 */
router.delete("/:id", authMiddleware, walletController.deleteWallet);

export default router;
