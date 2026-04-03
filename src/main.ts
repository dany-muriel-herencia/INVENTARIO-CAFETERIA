import app from "./app";
import { pool } from "./infraestructura/base_de_datos/conexion_mysql";

const PORT = process.env.PORT || 3000;

// Función para verificar conexión a BD
async function verificarConexion() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Conexión a MySQL exitosa");
        connection.release();
    } catch (error) {
        console.error("❌ Error conectando a la BD:", (error as Error).message);
        process.exit(1);
    }
}

// Verificar conexión y luego iniciar servidor
async function iniciar() {
    await verificarConexion();
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        console.log(`📊 Base de datos: ${process.env.DB_NAME}`);
    });
}

iniciar();
