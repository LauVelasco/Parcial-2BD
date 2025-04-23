// Crear restaurante
app.post('/api/restaurantes', async (req, res) => {
    const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body;
    const query = 'INSERT INTO restaurante (id_rest, nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4, $5) RETURNING *';

    try {
        const result = await pool.query(query, [id_rest, nombre, ciudad, direccion, fecha_apertura]);
        res.status(201).json({
            success: true,
            message: 'Restaurante creado',
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear restaurante', error: error.message });
    }
});

// Obtener restaurantes
app.get('/api/restaurantes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM restaurante');
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener restaurantes', error: error.message });
    }
});
