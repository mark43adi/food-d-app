const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const pricingRoutes = require("./routes/pricingRoutes");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

// Serve Swagger UI documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load("./docs/swagger.yaml"))
);

// Use pricingRoutes middleware for /pricing endpoint
app.use("/pricing", pricingRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
