// models/itemModel.js
const db = require("../config/database");

class Item {
  static async getById(id) {
    const query = {
      text: "SELECT * FROM item WHERE id = $1",
      values: [id],
    };
    const result = await db.query(query);
    return result.rows[0];
  }
}

module.exports = Item;
