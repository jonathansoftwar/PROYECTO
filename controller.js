const con=require("./db")
exports.getUsuarios = async(req,res)=> {
   
    const [rows]= await con.query("SELECT * FROM usuarios");
    res.json(rows)
}
exports.getUsuario =async(req, res) => {

    const [rows]=await con.query("SELECT * FROM usuarios WHERE id=?" ,[req.params.id])
   
    if (rows.length<=0) return res.status(404).json({messange:"Usuario no encontrado"})
        res.json(rows[0])
}

exports.login = async(req, res) => { 
    const {username,password}= req.body
    const [rows] = await con.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password])
        
    if (rows.length<=0) return res.status(404).json({messange: "Usuario no encontrado"})
    res.json(rows)
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

exports.eliminarUsuario=async(req, res) => {
const userId = req.params.id;

  try {
    // Verificar si el usuario existe 
    const [exists] = await con.query('SELECT * FROM usuarios WHERE id = ?', [userId]);
    if (exists.length<=0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Eliminar el usuario de la base de datos
    await con.query('DELETE FROM usuarios WHERE id = ?', [userId]);

    // Devolver una respuesta exitosa
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario de la base de datos' });
  }
};

exports.updateUsuario=async(req, res) => {
    const userId = req.params.id;
    
    const { username, password } = req.body;
  
    // Verificar los campos requeridos
    if (!username && !password) {
      return res.status(400).json({ error: 'los campos username, password son obligatorios' });
    }
  
    try {
      // Verificar si el usuario existe
      const [exists] = await con.query('SELECT * FROM usuarios WHERE id = ?', [userId]);
      if (exists.length<=0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Construir la consulta de actualización
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
  
      params.push(userId);

      // Actualizar registro en la base de datos
      const query = `UPDATE usuarios SET ${updateFields.join(', ')} WHERE id = ?`;
      
      await con.query(query, params);
  
      res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ error: 'Error al actualizar usuario en la base de datos' });
    }
 };

 //Metodos para el producto
 exports.getProductos = async(req,res)=> {
   
  const [rows]= await con.query("SELECT * FROM producto");
  res.json(rows)
}
exports.getProducto =async(req, res) => {

  const [rows]=await con.query("SELECT * FROM producto WHERE IdProducto=?" ,[req.params.id])
 
  if (rows.length<=0) return res.status(404).json({messange:"Producto no encontrado"})
      res.json(rows[0])
}

exports.createProducto=async(req, res) => {
  const {producto,existencia,valorunitarioventa,valorunitariocompra}= req.body

// Verificar los campos requeridos 
if (!producto || !existencia || !valorunitarioventa || !valorunitariocompra) {
  return res.status(400).json({ error: 'Todos los campos (producto, existencia, valorunitarioventa, valorunitariocompra ) son requeridos' });
}

try {
  // Insertar el producto en la base de datos
  const result = await con.query('INSERT INTO producto (Producto, Existencia, Valor_Unitario_Venta, Valor_Unitario_Compra) VALUES (?, ?, ?, ?)', [producto, existencia, valorunitarioventa, valorunitariocompra]);

  // Obtener el ID del producto insertado
  const productoId = result[0].insertId;

  res.status(201).json({ id: productoId, producto, existencia, valorunitarioventa, valorunitariocompra });
} catch (error) {
  console.error('Error al insertar producto:', error);
  res.status(500).json({ error: 'Error al insertar producto en la base de datos' });
}
};

exports.eliminarProducto=async(req, res) => {
const id = req.params.id;

try {
  // Verificar si el producto existe 
  const [exists] = await con.query('SELECT * FROM producto WHERE IdProducto = ?', [id]);
  if (exists.length<=0) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Eliminar el producto de la base de datos
  await con.query('DELETE FROM producto WHERE IdProducto = ?', [id]);

  // Devolver una respuesta exitosa
  res.status(200).json({ message: 'Producto eliminado correctamente' });
} catch (error) {
  console.error('Error al eliminar producto:', error);
  res.status(500).json({ error: 'Error al eliminar producto de la base de datos' });
}
};

exports.updateProducto=async(req, res) => {
  const id = req.params.id;
  
  const {  producto, existencia, valorunitarioventa, valorunitariocompra } = req.body;

  // Verificar los campos requeridos
  if (!producto && !existencia && !valorunitarioventa && !valorunitariocompra ) {
    return res.status(400).json({ error: 'los campos producto, existencia, valorunitarioventa, valorunitariocompra son obligatorios' });
  }

  try {
    // Verificar si el producto existe
    const [exists] = await con.query('SELECT * FROM producto WHERE IdProducto = ?', [id]);
    if (exists.length<=0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Construir la consulta de actualización
    const updateFields = [];
    const params = [];
    
    if (producto) {
      updateFields.push('Producto = ?');
      params.push(producto);
    }
    
    if (existencia) {
      updateFields.push('Existencia = ?');
      params.push(existencia);
    }

    if (valorunitarioventa) {
      updateFields.push('Valor_Unitario_Venta = ?');
      params.push(valorunitarioventa);
    }
    
    if (valorunitariocompra) {
      updateFields.push('Valor_Unitario_Compra = ?');
      params.push(valorunitariocompra);
    }

    params.push(id);

    // Actualizar registro en la base de datos
    const query = `UPDATE producto SET ${updateFields.join(', ')} WHERE IdProducto = ?`;
    
    await con.query(query, params);

    res.status(200).json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto en la base de datos' });
  }
};
  





















