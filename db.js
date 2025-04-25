const { Pool } = require('pg');

// Crear una instancia del pool
const pool = new Pool({
  host: 'aws-0-us-east-1.pooler.supabase.com',
  port: 5432,
  user: 'postgres.jbxeibcmvpdokmkogwll',
  password: 'LauraVel-664321',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

// Verificar la conexión al iniciar (esto es solo para probar)
pool.query('SELECT NOW()')
  .then(res => {
    console.log(' Conectado a PostgreSQL. Hora actual:', res.rows[0].now);
  })
  .catch(err => {
    console.error(' Error al conectar a PostgreSQL:', err);
  });

// Exportar el pool para que lo uses en index.js
module.exports = pool;
