const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Variables para la conexion a la base de datos
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Rest para el login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Se consulta en la tabla de usuarios con los datos ingresados
    con.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) throw err;

        // Si se encuentra algun usuario el login es exitoso
        if (result.length > 0) {
            res.send('Login exitoso');
        } else {
            res.send('Usuario o contraseña invalidos');
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});