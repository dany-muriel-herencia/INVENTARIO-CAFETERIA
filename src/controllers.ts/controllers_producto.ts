import { Repositorios_producto } from "../infraestructura/repositorios/repositorios_producto";
import { agregar_producto } from "../aplicacion/casos de uso/registrar_producto";
import { Buscar_producto } from "../aplicacion/casos de uso/buscar_producto";
import { ListarProductos } from "../aplicacion/casos de uso/listar_producto";
import { Producto } from "../dominio/entidades/producto";
import { Request, Response } from "express";


export class controllers_producto {
    private readonly registrar_producto: agregar_producto;
    private readonly buscar_producto: Buscar_producto;
    private readonly listar_productos: ListarProductos;
    
    constructor(repo_producto: Repositorios_producto) {
        this.registrar_producto = new agregar_producto(repo_producto);
        this.buscar_producto = new Buscar_producto(repo_producto);
        this.listar_productos = new ListarProductos(repo_producto);
    }

    async registrar(req: Request, res: Response): Promise<void> {
        try {
            const producto = req.body as Producto;
            const resultado = await this.registrar_producto.ejecutar(producto);
            res.status(201).json({
                mensaje: "Producto registrado correctamente",
                producto: resultado
            });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async buscar(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;
            if (!id || Array.isArray(id)) {
                res.status(400).json({ error: "El ID del producto es inválido" });
                return;
            }
            const producto = await this.buscar_producto.buscarProductoPorId(id);
            res.status(200).json({
                mensaje: "Producto encontrado correctamente",
                producto: producto
            });
        } catch (error) {
            res.status(404).json({ error: (error as Error).message });
        }
    }

    async listar(req: Request, res: Response): Promise<void> {
        try {
            const productos = await this.listar_productos.listarProductos();
            res.status(200).json({
                mensaje: "Productos listados correctamente",
                productos: productos
            });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
