const express = require("express");
const bodyParser = express.json();
const PricingService = require("./pricing.service");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser);
app.use(
  cors({
    origin: "http://localhost:3000/",
  })
);

const pricingService = new PricingService();

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Food Delivery Pricing API",
      version: "1.0.0",
      description:
        "API for calculating food delivery costs based on zone, distance, and item type.",
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: ["./server.js"], // Path to your API endpoints
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /calculate-price:
 *   post:
 *     summary: Calculate delivery price
 *     description: Calculates the total cost of food delivery based on zone, distance, and item type.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *                 description: Delivery zone
 *                 example: "central"
 *               organization_id:
 *                 type: string
 *                 description: Organization ID
 *                 example: "005"
 *               total_distance:
 *                 type: number
 *                 description: Total distance in kilometers
 *                 example: 12
 *               item_type:
 *                 type: string
 *                 description: Type of item (perishable or non-perishable)
 *                 example: "perishable"
 *     responses:
 *       '200':
 *         description: Successful price calculation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_price:
 *                   type: number
 *                   description: Total delivery price in cents
 *                   example: 2050
 */

app.post("/calculate-price", async (req, res) => {
  const { zone, organization_id, total_distance, item_type } = req.body;

  try {
    const totalPrice = await pricingService.calculatePrice(
      zone,
      organization_id,
      total_distance,
      item_type
    );
    res.json({ total_price: totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error calculating price");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`API Documentation: http://localhost:${port}/api-docs`);
});
