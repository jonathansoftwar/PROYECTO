const con=require("./db")

exports.login = async(req, res) => { 
    const {username,password}= req.body
    const [rows] = await con.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password])
        
    if (rows.length<=0) return res.status(404).json({messange: "Usuario o contraseña invalidos"})
    res.json({messange: "Login exitoso"})
    }

exports.createUsuario=async(req, res) => {
    const {username,password}= req.body

  // Verificar los campos requeridos 
  if (!username || !password) {
    return res.status(400).json({ error: 'Todos los campos (username, password) son requeridos' });
  }

  try {
    // Insertar el usuario en la base de datos
    const result = await con.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, password]);

    // Obtener el ID del usuario insertado
    const userId = result[0].insertId;

    res.status(201).json({ id: userId, username });
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.status(500).json({ error: 'Error al insertar usuario en la base de datos' });
  }
};

