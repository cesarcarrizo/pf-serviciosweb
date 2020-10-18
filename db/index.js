// modulo para importar los datos desde la BD
const sql = require('mssql/msnodesqlv8');

// configuracion para que sea local
const config = {
    server: "DESKTOP-0NH69QF",
    database: "test_db",
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }    
};

// instancia de la conexion
const pool = new sql.ConnectionPool(config);

// secuencia de la logica para probar la conexion (exitosa)
const request = new sql.Request(pool);

let test = request.query('select * from personas;', (err, result) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(JSON.parse(result.recordsets));
});

module.exports = {
    test
};