// config/database.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // Replace 'your_username' with your PostgreSQL username
  host: "localhost",
  database: "postgres", // Replace 'your_database' with the name of your PostgreSQL database
  password: "aditya", // Replace 'your_password' with your PostgreSQL password
  port: 5432, // Default PostgreSQL port is 5432
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the database");
  }
  release();
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
