require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT), // ✅ importante: convertir a número
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conexión exitosa a la base de datos");
    const [rows] = await connection.query("SELECT 1");
    console.log("✅ Consulta de prueba exitosa:", rows);
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:");
    console.error(error);
    return false;
  }
}

if (require.main === module) {
  testConnection();
}

module.exports = pool;

