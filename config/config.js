require('dotenv').config(); // Optional: Load environment variables if needed

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'depatpay_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    // Add other options here (e.g., port, logging, etc.)
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME ||  'depatpay_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "XURNNNqPpmuKehJusyDEFpoJzawpOKiF",
    database: process.env.MYSQLDATABASE || "railway",
    host: process.env.MYSQLHOST || "mysql.railway.internal",
    port: parseInt(process.env.MYSQLPORT, 10), // Convert string to number
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Required for Railway's SSL certificate
      }
    },
    pool: {
      max: 5,     // Maximum number of connections
      min: 0,     // Minimum number of connections
      acquire: 30000, // Maximum time (ms) to acquire connection
      idle: 10000 // Maximum idle time (ms) for a connection
    },
    logging: false, // Disable SQL query logging in production
    define: {
      timestamps: true, // Enable automatic timestamps
      freezeTableName: true // Prevent pluralization of table names
    }
  }
};


// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "depatpay_dev",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "depatpay_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "depatpay_prod",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }
