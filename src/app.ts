import express, { Express } from "express";
import { pool } from "./infraestructura/base_de_datos/conexion_mysql";
import { Repositorios_producto } from "./infraestructura/repositorios/repositorios_producto";
import { Repositorio_usuario } from "./infraestructura/repositorios/respositorio_usuario";
import { Repositorio_lote } from "./infraestructura/repositorios/repositorio_lote";
import { controllers_producto } from "./controllers.ts/controllers_producto";
import { controllers_usuario } from "./controllers.ts/controllers_usuario";
import { controllers_alertas } from "./controllers.ts/controllers_alertas";
import { controllers_reportes } from "./controllers.ts/controllers_reportes";


const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar repositorios
const repo_producto = new Repositorios_producto();
const repo_usuario = new Repositorio_usuario();
const repo_lote = new Repositorio_lote();

// Instanciar controladores
const ctrl_producto = new controllers_producto(repo_producto);
const ctrl_usuario = new controllers_usuario(repo_usuario);
const ctrl_alertas = new controllers_alertas(repo_producto, repo_lote);
const ctrl_reportes = new controllers_reportes(repo_producto);

// Rutas de Productos
app.post("/productos", (req, res) => ctrl_producto.registrar(req, res));
app.get("/productos/:id", (req, res) => ctrl_producto.buscar(req, res));
app.get("/productos", (req, res) => ctrl_producto.listar(req, res));

// Rutas de Usuarios
app.post("/usuarios/login", (req, res) => ctrl_usuario.login(req, res));
app.post("/usuarios/buscar", (req, res) => ctrl_usuario.buscar(req, res));

// Rutas de Alertas
app.get("/alertas", (req, res) => ctrl_alertas.obtener_todas(req, res));
app.post("/alertas/generar", (req, res) => ctrl_alertas.generar(req, res));
app.get("/alertas/lote-bajo", (req, res) => ctrl_alertas.verificar_lote_bajo(req, res));
app.get("/alertas/proximos-vencer", (req, res) => ctrl_alertas.verificar_proximos_a_vencer(req, res));
app.get("/alertas/almacenamiento", (req, res) => ctrl_alertas.verificar_almacenamiento(req, res));

// Rutas de Reportes
app.get("/reportes/productos", (req, res) => ctrl_reportes.reporte_productos(req, res));

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({ mensaje: "Servidor de Inventario Cafetería activo" });
});

// Ruta para verificar conexión a la BD
app.get("/health", async (req, res) => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        res.status(200).json({ 
            status: "✅ OK",
            mensaje: "Servidor y BD conectados correctamente",
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({
            status: "❌ Error",
            mensaje: "No se puede conectar a la BD",
            error: (error as Error).message
        });
    }
});

export default app;
