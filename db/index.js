let Connection = require('tedious').Connection;

const config = {
    server: 'localhost',
    options: {
        encrypt: false,
        database: 'master',
        debug: {
            packet: true,
            data: true,
            payload: true,
            token: false,
            log: true
        }
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'DESKTOP-0NH69QF\\ADMIN',
            password: 'admin'
        }
    }
};

let conn = new Connection(config);

conn.connect((err) => {
    if (err) {
        console.log('Error :', err);
    }
    console.log("Success");
});

module.exports = conn;
