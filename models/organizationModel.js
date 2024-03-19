// models/organizationModel.js
const db = require("../config/database");

class Organization {
  static async getById(id) {
    const query = {
      text: "SELECT * FROM organization WHERE id = $1",
      values: [id],
    };
    const result = await db.query(query);
    return result.rows[0];
  }
}

module.exports = Organization;
