const pricingService = require("../services/pricingService");

exports.calculatePrice = (req, res) => {
  const { zone, organization_id, total_distance, item_type } = req.body;

  try {
    const total_price = pricingService.calculatePrice(
      zone,
      organization_id,
      total_distance,
      item_type
    );
    res.json({ total_price });
    console.log(total_price);
  } catch (error) {
    console.error("Error calculating price:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};
