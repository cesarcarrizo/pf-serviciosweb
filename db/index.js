const sql = require("mssql");

let config = {
    user: '...',
    password: '...',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: '...'
}

const connectionPool = new sql.ConnectionPool(config);
