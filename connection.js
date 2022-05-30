const mysql = require("mysql2");
require('dotenv').config();


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.db_username,
  password: process.env.db_pw,
  database: process.env.db_name,
});

module.exports = connection;