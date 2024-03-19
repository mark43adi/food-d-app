const db = require("../config/database");

exports.calculatePrice = async (
  organization_id,
  zone,
  item_type,
  total_distance
) => {
  try {
    // Fetch pricing details from the database
    const query = {
      text: `
          SELECT fix_price, base_distance_in_km, km_price
          FROM pricing
          WHERE organization_id = $1
          AND zone = $2
          AND item_id = (SELECT id FROM item WHERE type = $3)
        `,
      values: [organization_id, zone, item_type],
    };
    const result = await db.query(query);

    if (result.rows.length === 0) {
      throw new Error("Pricing not found for the given parameters");
    }

    const { fix_price, base_distance_in_km, km_price } = result.rows[0];

    // Calculate total price
    const additional_distance = Math.max(
      total_distance - base_distance_in_km,
      0
    );
    const total_price = fix_price + additional_distance * km_price;

    return total_price;
  } catch (error) {
    console.error("An error occurred while calculating the price:", error);
    throw new Error("An error occurred while calculating the price");
  }
};
