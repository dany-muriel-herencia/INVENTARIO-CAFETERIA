import { Repositorios_producto } from "../infraestructura/repositorios/repositorios_producto";
import { ListarProductos } from "../aplicacion/casos de uso/listar_producto";
import { Request, Response } from "express";


export class controllers_reportes {
    private readonly listar_productos: ListarProductos;

    constructor(repo_producto: Repositorios_producto) {
        this.listar_productos = new ListarProductos(repo_producto);
    }

    async reporte_productos(req: Request, res: Response): Promise<void> {
        try {
            const productos = await this.listar_productos.listarProductos();
            res.status(200).json({
                mensaje: "Reporte de productos generado correctamente",
                productos: productos,
                total: productos.length
            });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}