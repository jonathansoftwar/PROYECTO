const mysql = require('mysql2/promise');

let connection;

beforeAll(async () => {
  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tati1234567',
    database: 'proyecto'
  });
});

afterAll(async () => {
  await connection.end();
});

// archivo producto.test.js
const request = require('supertest');
const app = require('./app'); // Importar la app de express

describe('Pruebas de integración para GET /api/productos', () => {
  it('debería retornar un array de usuarios', async () => {
    const response = await request(app).get('/api/productos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('Pruebas de integración para GET por id /api/productos/:id', () => {
  it('debería retornar un array de usuarios', async () => {
    const response = await request(app).get('/api/productos/5');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ IdProducto: 5, Producto: 'comida nutrecan', Existencia: 20, Valor_Unitario_Venta: 150000,  Valor_Unitario_Compra: 135000});
  });
});

describe('Pruebas de integración para POST /api/productos', () => {
  test('Debe crear un nuevo producto', async () => {
    const response = await request(app)
      .post('/api/productos')
      .send({ producto: 'antipulgas', existencia: 200, valorunitarioventa: 15000, valorunitariocompra: 12000});
    
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/productos/productos.html');
  });

  test('Manejo de errores de creación', async () => {
    const response = await request(app)
      .post('/api/productos')
      .send({ producto: 'Producto sin precio' }); // Faltan los demas campos

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Todos los campos (producto, existencia, valorunitarioventa, valorunitariocompra ) son requeridos");
  });
});

describe('Pruebas de integración para PATCH /api/productos/:id', () => {
  
  test('Debe actualizar un producto existente', async () => {
    const response = await request(app)
      .patch('/api/productos/1')
      .send({ producto: 'jabonx', existencia: 200, valorunitarioventa: 15000, valorunitariocompra: 12000 });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Producto actualizado exitosamente');
  });

  test('Manejo de errores de actualización', async () => {
    const response = await request(app)
      .patch('/api/productos/-1') // Producto no encontrado
      .send({ producto: 'jabonx', existencia: 200, valorunitarioventa: 15000, valorunitariocompra: 12000 });
    
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'Producto no encontrado' });
  });
});

describe('Pruebas de integración para DELETE /api/productos/:id', function() {
  test('Debe eliminar un producto existente', async () => {
    const res = await request(app)
      .delete("/api/productos/68")
      .expect(200)

      expect(res.body.message).toBe('Producto eliminado correctamente');
});
describe('Pruebas de integración para GET /api/companias', () => {
  it('debería retornar un array de compañias', async () => {
    const response = await request(app).get('/api/companias');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
describe('Pruebas de integración para GET por id /api/compania/:id', () => {
  it('debería retornar una compañia', async () => {
    const response = await request(app).get('/api/companias/4');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ IdCompania: 4, Nit: "14253698", Compania: 'select pet'});
  });
});
describe('Pruebas de integración para POST /api/compania', () => {
  test('Debe crear una nueva compañia', async () => {
    const response = await request(app)
      .post('/api/companias')
      .send({ compania: 'districat', nit: 3028574});
    
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/compania/compania.html');
  });

  test('Manejo de errores de creación', async () => {
    const response = await request(app)
      .post('/api/companias')
      .send({ Compania: 'Compania sin datos' }); // Faltan los demas campos

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Todos los campos (nit, compania ) son requeridos");
  });
});
describe('Pruebas de integración para PATCH /api/compania/:id', () => {
  
  test('Debe actualizar una compania existente', async () => {
    const response = await request(app)
      .patch('/api/companias/4')
      .send({ compania: 'select pet', nit: "14253698" });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Compania actualizada exitosamente');
  });

  test('Manejo de errores de actualización', async () => {
    const response = await request(app)
      .patch('/api/companias/-1') // Compañia no encontrada
      .send({ compania: 'select pet', nit: "14253698" });
    
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'Compania no encontrada' });
  });
});
describe('Pruebas de integración para DELETE /api/compania/:id', function() {
  test('Debe eliminar una compania existente', async () => {
    const res = await request(app)
      .delete("/api/companias/33")
      .expect(200)

      expect(res.body.message).toBe('Compania eliminada correctamente');
});
});
describe('Pruebas de integración para GET /api/usuarios', () => {
  it('debería retornar un array de usuarios', async () => {
    const response = await request(app).get('/api/usuarios');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
describe('Pruebas de integración para GET por id /api/usuarios/:id', () => {
  it('debería retornar un array de usuarios', async () => {
    const response = await request(app).get('/api/usuarios/3');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 3, username: 'sebas', password: "carro9211"});
  });
});
describe('Pruebas de integración para POST /api/usuarios', () => {
  test('Debe crear un nuevo usuario', async () => {
    const response = await request(app)
      .post('/api/usuarios')
      .send({ username:'maria', password: "jonathan92"});
    
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/usuarios/usuarios.html');
  });

  test('Manejo de errores de creación', async () => {
    const response = await request(app)
      .post('/api/usuarios')
      .send({ username: 'usuario sin contraseña' }); // Faltan los demas campos

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Todos los campos (username, password) son requeridos");
  });
});
describe('Pruebas de integración para PATCH /api/usuarios/:id', () => {
  
  test('Debe actualizar un usuario existente', async () => {
    const response = await request(app)
      .patch('/api/usuarios/1')
      .send({ username: 'david', password: 'prueba' });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Usuario actualizado exitosamente');
  });

  test('Manejo de errores de actualización', async () => {
    const response = await request(app)
      .patch('/api/usuarios/-1') // Usuario no encontrado
      .send({ username: 'davidd', password: 'realizar' });
    
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'Usuario no encontrado' });
  });
});
describe('Pruebas de integración para DELETE /api/usuarios/:id', function() {
  test('Debe eliminar un usuario existente', async () => {
    const res = await request(app)
      .delete("/api/usuarios/23")
      .expect(200)

      expect(res.body.message).toBe('Usuario eliminado correctamente');
});
});
});