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

// test passed with test_db
let test = async () => {
    try{
        // valores a ingresar
        let value = 24815638;
        //conectamos por medio de un pool
        let pool = await sql.connect(config);

        //debemos especificar cual tipo es en el segundo parametro
        let result = await pool.request()
        .input('input_parameter', sql.Int, value)
        .query('select * from personas where cedula = @input_parameter;');

        // imprime resultado
        console.dir(result.recordset);
        return result.recordset;
    }
    catch(err){
        // otherwiseeeee
        console.log(err);
        return err;
    }
};

module.exports = {
    test
};