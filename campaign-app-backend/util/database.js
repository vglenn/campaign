const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "mailshake-applicants.cgdsgo2tzurk.us-east-1.rds.amazonaws.com",
  user: "veatriceglenn",
  password: "hM)Cf(8xyjsGiv[0",
  database: "music",
});

module.exports = pool.promise();
