const { Pool } = require('pg');

const pool = new Pool({
  host: 'aws-0-us-east-1.pooler.supabase.com',
  port: 5432,
  user: 'postgres.jbxeibcmvpdokmkogwll',
  password: 'LauraVel-664321',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }  // Supabase requiere conexión segura
});

// Verificamos la conexión
pool.connect()
  .then(() => console.log(' Conectado a PostgreSQL en Supabase'))
  .catch(err => console.error(' Error de conexión:', err));

module.exports = pool;
