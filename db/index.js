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

let crearUsuario = async (cedula, nombreComp, username, passwd, email, pregunta, respuesta) =>{
    // por default se crea el usuario siendo solo consultor
    try{
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('cedula', sql.Int, cedula)
        .query(`insert into t_usuarios values (@cedula, '${nombreComp}','${username}','${passwd}','${email}','${pregunta}','${respuesta}', null, null, 4);`);

        return result.recordset[0];
    }
    catch(err){
        console.log(err);
        return;
    }
};

let guest = async (pk) => {
    try {
        let pool = await sql.connect(config);
        //debemos especificar cual tipo es en el segundo parametro
        let result = await pool.request()
        .input('param', sql.Int, pk)
        .query('select * from t_usuarios where cedula_usu_pk = @param;');
        // compara el password con en del registro y evalua
        return result.recordset[0];
    }
    catch(err){
        console.log(err);
        return;
    }
}


let autenticacion = async (cedula, passwd) => {
    
    try{
        //conectamos por medio de un pool
        let pool = await sql.connect(config);
        //debemos especificar cual tipo es en el segundo parametro
        let result = await pool.request()
        .input('param', sql.Int, cedula)
        .query('select * from t_usuarios where cedula_usu_pk = @param;');
        // compara el password con en del registro y evalua
        let dataObject = result.recordset[0];
        // si no existe
        if(dataObject===undefined){
            return false;
        }

        // si existe y hace match con el password pasado...
        if(dataObject.passwd_usu === passwd){
            // asignamos el Id del cliente para referenciarlo luego en el home
            global.authId = dataObject.cedula_usu_pk;
            return true;
        }
        return false;
        
    }
    catch (err){
        console.log(err);
        return false;
    }
};

// TEST FUNCTION
// test passed with test_db
let test = async () => {
    try{
        // valores a ingresar
        let value = 123;
        //conectamos por medio de un pool
        let pool = await sql.connect(config);

        //debemos especificar cual tipo es en el segundo parametro
        let result = await pool.request()
        .input('input_parameter', sql.Int, value)
        .query('select * from t_usuarios where cedula_usu_pk = @input_parameter;');

        // imprime resultado
        return result.recordset[0];
    }
    catch(err){
        // otherwiseeeee
        console.log(err);
        return err;
    }
};

module.exports = {
    autenticacion,
    guest,
    crearUsuario
};