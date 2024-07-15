const con=require("./db")
exports.getUsuarios = async(req,res)=> {
   
    const [rows]= await con.query("SELECT * FROM usuarios");
    res.json(rows)
}
exports.getUsuario =async(req, res) => {

    const [rows]=await con.query("SELECT * FROM usuarios WHERE username=?" ,[req.params.id])
   
    if (rows.length<=0) return res.status(404).json({messange:"Usuario no encontrado"})
        res.json(rows[0])
}

exports.login = async(req, res) => { 
    const {username,password}= req.body
    const [rows] = await con.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password])
        
    if (rows.length<=0) return res.status(404).json({messange: "Usuario no encontrado"})
    
    }

exports.createUsuario=async(req, res) => {
    const { username, password } = req.body;

  // Verificar si todos los campos requeridos están presentes
  if (!username || !password) {
    return res.status(400).json({ error: 'Todos los campos (username, password) son requeridos' });
  }

  try {
    // Insertar el usuario en la base de datos
    const result = await db.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, password]);

    // Obtener el ID del usuario insertado
    const insertedUserId = result.insertId;

    // Devolver una respuesta exitosa
    res.status(201).json({ id: insertedUserId, username, email });
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.status(500).json({ error: 'Error al insertar usuario en la base de datos' });
  }
};

exports.eliminarUsuario=async(req, res) => {
const userId = req.params.id;

  try {
    // Verificar si el usuario existe antes de eliminarlo (opcional)
    const [user] = await db.query('SELECT * FROM usuarios WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Eliminar el usuario de la base de datos
    await db.query('DELETE FROM usuarios WHERE id = ?', [userId]);

    // Devolver una respuesta exitosa
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario de la base de datos' });
  }
};

exports.updateUsuario=async(req, res) => {
    const userId = req.params.id;
    console.log(req.body)
    const { username, password } = req.body;
  
    // Verificar si todos los campos requeridos están presentes
    if (!username && !password) {
      return res.status(400).json({ error: 'Se requiere al menos uno de los campos (username, password) para actualizar' });
    }
  
    try {
      // Verificar si el usuario existe antes de actualizarlo (opcional)
      const [existingUser] = await db.query('SELECT * FROM usuarios WHERE id = ?', [userId]);
      if (!existingUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Construir la consulta de actualización según los campos proporcionados
      const updateFields = [];
      const params = [];
  
      if (username) {
        updateFields.push('username = ?');
        params.push(username);
      }
      
      if (password) {
        updateFields.push('password = ?');
        params.push(password);
      }
  
      // Ejecutar la consulta de actualización en la base de datos
      const query = "UPDATE usuarios SET ${updateFields.join(', ')} WHERE id = ?";
      params.push(userId);
      await db.query(query, params);
  
      // Devolver una respuesta exitosa
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ error: 'Error al actualizar usuario en la base de datos' });
    }
  };
  




















