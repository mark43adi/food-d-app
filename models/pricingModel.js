// models/pricingModel.js
const db = require("../config/database");

class Pricing {
  static async getPricingDetails(zone, organization_id, item_type) {
    const query = {
      text: `
        SELECT * FROM pricing
        WHERE organization_id = $1
        AND zone = $2
        AND item_id = (SELECT id FROM item WHERE type = $3)
      `,
      values: [organization_id, zone, item_type],
    };
    const result = await db.query(query);
    return result.rows[0];
  }
}

module.exports = Pricing;
