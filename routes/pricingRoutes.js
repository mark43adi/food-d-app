const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricingController");

/**
 * @swagger
 * /pricing/calculate-price:
 *   post:
 *     summary: Calculate delivery price
 *     description: Calculate the total cost of food delivery based on various factors.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *               organization_id:
 *                 type: string
 *               total_distance:
 *                 type: number
 *               item_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_price:
 *                   type: number
 *       500:
 *         description: An error occurred while processing the request
 */
router.post("/calculate-price", pricingController.calculatePrice);

module.exports = router;
