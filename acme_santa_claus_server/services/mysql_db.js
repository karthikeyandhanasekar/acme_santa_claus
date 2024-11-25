const mysql = require("mysql2");

// Create a connection pool for efficient connection reuse
const pool = mysql.createPool({
  host: "localhost", // Replace with your database host
  user: "root", // Replace with your database username
  password: "root", // Replace with your database password
  database: "acme_santa_claus_db", // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // No limit for connection requests in the queue
});

// Export a promise-based version of the pool
const promisePool = pool.promise();

module.exports = promisePool;
