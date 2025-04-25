const express = require('express');
const connection = require('./db'); // conexión a Supabase
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ───────────────────────────────────────────────
//  RUTAS DE PRUEBA
// ───────────────────────────────────────────────
app.get('/api/prueba', (req, res) => {
    res.send('Estoy respondiendo por la API');
});

app.get('/api/prueba2', (req, res) => {
    res.status(200).json({
        message: 'API funciona bien',
        port: PORT,
        status: 'exitoso'
    });
});

// ───────────────────────────────────────────────
//  RESTAURANTES
// ───────────────────────────────────────────────
app.get('/api/restaurantes', (req, res) => {
    connection.query('SELECT * FROM restaurante', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

app.post('/api/restaurantes', (req, res) => {
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    connection.query(
        'INSERT INTO restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, ciudad, direccion, fecha_apertura],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(results.rows[0]);
        }
    );
});

app.put('/api/restaurantes/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    connection.query(
        'UPDATE restaurante SET nombre=$1, ciudad=$2, direccion=$3, fecha_apertura=$4 WHERE id_rest=$5 RETURNING *',
        [nombre, ciudad, direccion, fecha_apertura, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results.rows[0]);
        }
    );
});

app.delete('/api/restaurantes/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM restaurante WHERE id_rest=$1', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// ───────────────────────────────────────────────
//   EMPLEADOS
// ───────────────────────────────────────────────
app.get('/api/empleados', (req, res) => {
    connection.query('SELECT * FROM empleado', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

app.post('/api/empleados', (req, res) => {
    const { nombre, rol, id_rest } = req.body;
    connection.query(
        'INSERT INTO empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *',
        [nombre, rol, id_rest],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(results.rows[0]);
        }
    );
});

app.put('/api/empleados/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, rol, id_rest } = req.body;
    connection.query(
        'UPDATE empleado SET nombre=$1, rol=$2, id_rest=$3 WHERE id_empleado=$4 RETURNING *',
        [nombre, rol, id_rest, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results.rows[0]);
        }
    );
});

app.delete('/api/empleados/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM empleado WHERE id_empleado=$1', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// ───────────────────────────────────────────────
//   PRODUCTOS
// ───────────────────────────────────────────────
app.get('/api/productos', (req, res) => {
    connection.query('SELECT * FROM producto', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

app.post('/api/productos', (req, res) => {
    const { nombre, precio } = req.body;
    connection.query(
        'INSERT INTO producto (nombre, precio) VALUES ($1, $2) RETURNING *',
        [nombre, precio],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(results.rows[0]);
        }
    );
});

app.put('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, precio } = req.body;
    connection.query(
        'UPDATE producto SET nombre=$1, precio=$2 WHERE id_prod=$3 RETURNING *',
        [nombre, precio, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results.rows[0]);
        }
    );
});

app.delete('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM producto WHERE id_prod=$1', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// ───────────────────────────────────────────────
//   PEDIDOS
// ───────────────────────────────────────────────
app.get('/api/pedidos', (req, res) => {
    connection.query('SELECT * FROM pedido', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

app.post('/api/pedidos', (req, res) => {
    const { fecha, id_rest, total } = req.body;
    connection.query(
        'INSERT INTO pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *',
        [fecha, id_rest, total],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(results.rows[0]);
        }
    );
});

app.put('/api/pedidos/:id', (req, res) => {
    const id = req.params.id;
    const { fecha, id_rest, total } = req.body;
    connection.query(
        'UPDATE pedido SET fecha=$1, id_rest=$2, total=$3 WHERE id_pedido=$4 RETURNING *',
        [fecha, id_rest, total, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results.rows[0]);
        }
    );
});

app.delete('/api/pedidos/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM pedido WHERE id_pedido=$1', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// ───────────────────────────────────────────────
//   DETALLE PEDIDO
// ───────────────────────────────────────────────
app.get('/api/detalles', (req, res) => {
    connection.query('SELECT * FROM detallepedido', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

app.post('/api/detalles', (req, res) => {
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    connection.query(
        'INSERT INTO detallepedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *',
        [id_pedido, id_prod, cantidad, subtotal],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(results.rows[0]);
        }
    );
});

app.put('/api/detalles/:id', (req, res) => {
    const id = req.params.id;
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    connection.query(
        'UPDATE detallepedido SET id_pedido=$1, id_prod=$2, cantidad=$3, subtotal=$4 WHERE id_detalle=$5 RETURNING *',
        [id_pedido, id_prod, cantidad, subtotal, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results.rows[0]);
        }
    );
});

app.delete('/api/detalles/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM detallepedido WHERE id_detalle=$1', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).send();
    });
});

// ───────────────────────────────────────────────
//  CONSULTAS ESPECIALES
// ───────────────────────────────────────────────

// 1. Mostrar los productos de un pedido
app.get('/api/pedido/:id/productos', (req, res) => {
    const idPedido = req.params.id;
    const query = `
        SELECT p.nombre, p.precio, dp.cantidad, dp.subtotal
        FROM detallepedido dp
        JOIN producto p ON dp.id_prod = p.id_prod
        WHERE dp.id_pedido = $1
    `;
    connection.query(query, [idPedido], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

// 2. Empleados por restaurante
app.get('/api/restaurante/:id/empleados', (req, res) => {
    const idRest = req.params.id;
    connection.query('SELECT * FROM empleado WHERE id_rest = $1', [idRest], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

// 3. Total de ventas por restaurante
app.get('/api/ventas/restaurantes', (req, res) => {
    const query = `
        SELECT r.nombre, SUM(p.total) AS total_ventas
        FROM restaurante r
        JOIN pedido p ON r.id_rest = p.id_rest
        GROUP BY r.nombre
        ORDER BY total_ventas DESC
    `;
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows);
    });
});

// 4. Obtener los pedidos realizados en una fecha específica
app.get('/api/pedidos/fecha/:fecha', (req, res) => {
    const fecha = req.params.fecha; // Obtener la fecha del parámetro de la URL
    const query = `
        SELECT * 
        FROM pedido 
        WHERE fecha = $1
    `;
    connection.query(query, [fecha], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows); // Devolver los resultados de los pedidos
    });
});

// 5. Obtener los empleados por rol en un restaurante específico
app.get('/api/restaurante/:id/empleados/rol/:rol', (req, res) => {
    const idRest = req.params.id;  // Obtener el id del restaurante del parámetro
    const rol = req.params.rol;    // Obtener el rol del parámetro
    const query = `
        SELECT * 
        FROM empleado 
        WHERE id_rest = $1 AND rol = $2
    `;
    connection.query(query, [idRest, rol], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.rows); // Devolver los empleados que coinciden con el rol y restaurante
    });
});


// ───────────────────────────────────────────────
//  SERVIDOR
// ───────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
