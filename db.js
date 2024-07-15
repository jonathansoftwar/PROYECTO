const mysql = require('mysql2');
// Variables para la conexion a la base de datos
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tati1234567',
    database: 'proyecto'
});

// Se crea conexion a la base de datos de mysql
con.connect((err) => {
    if (err) throw err;
    console.log('Conexion exitosa a la base de datos');

    // Crear la tabla usuarios si no existe
    con.query('CREATE TABLE IF NOT EXISTS usuarios (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) NOT NULL, password VARCHAR(255) NOT NULL)', (err) => {
        if (err) throw err;
        console.log('Table creada exitosamente');
    });
})
module.exports=con.promise();