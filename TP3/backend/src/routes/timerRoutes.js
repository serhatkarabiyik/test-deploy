import express from "express";
import {
  submitReactionTime,
  getReactionTimes,
} from "../controllers/timerController.js";

const router = express.Router();
/**
 * @swagger
 * /timer/submit-reaction-time:
 *   post:
 *     summary: Soumet un temps de réaction pour un utilisateur
 *     tags: [Timer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               reactionTime:
 *                 type: number
 *                 example: 350
 *     responses:
 *       201:
 *         description: Temps de réaction soumis avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 reactionTime:
 *                   type: number
 *                   example: 350
 *       400:
 *         description: Erreur lors de la soumission du temps de réaction
 */
router.post("/submit-reaction-time", submitReactionTime);

/**
 * @swagger
 * /timer/get-reaction-times/{userId}:
 *   get:
 *     summary: Récupère les temps de réaction pour un utilisateur donné
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des temps de réaction pour l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reactionTime:
 *                     type: number
 *                     example: 350
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-08-29T14:48:00.000Z"
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/get-reaction-times/:userId", getReactionTimes);

export default router;
