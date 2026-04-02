import { Producto } from "../../dominio/entidades/producto";
import { Repo_producto } from "../../dominio/repositorios/repo_producto";
import { pool } from "../base_de_datos/conexion_mysql";
import { lote } from "../../dominio/entidades/lote";
import { Repositorio_lote } from "./repositorio_lote";
import { get } from "node:http";
import { CharsetToEncoding } from "mysql2";

export class Repositorios_producto implements Repo_producto {
         
    async guardar(producto: Producto, categoria: string): Promise<void> {
        const repositorioLote = new Repositorio_lote();
        const Lote_id = await repositorioLote.get_lote_id(categoria);
        if(Lote_id === null){
            const nuevoLote = new lote([producto], categoria);
            await repositorioLote.guardar(nuevoLote);
        }

        await pool.execute(
            "INSERT INTO productos (id,nombre,precio,fecha_caducidad,peso,Lote_id) VALUES ( ? , ? , ? , ? , ? , ?) ",
        [
            producto.Id,
            producto.Nombre,
            producto.getPrecio(),
            producto.Fecha_caducidad,
            producto.Peso,
            Lote_id,
            producto.Id
        ]);
        try {
            true;
        } catch (error) {
            console.error("Error al guardar el producto:", error);
            throw new Error("No se pudo guardar el producto");
        }
    }

    async obtenerTodos(): Promise<Producto[]> {
        const [rows] :any  = await pool.execute(
            "SELECT id, noombre, precio, fecha_caducidad, peso FROM productos",
        );
        return rows;
    }
    async buscarPorId(id: number): Promise<Producto | null> {
        
        const [rows] : any = await pool.execute(
            "SELECT * FROM productos WHERE id = ?",
            [id]
        );
        if(rows.length > 0){
            return rows[0];
        }
        return null;
        
    }
    async buscarPorNombre(nombre: string): Promise<Producto[] | null> {
        const [rows] : any =await pool.execute(
            "SELECT *FROM PRODUCTOS WHERE noombre LIKE ?",[`%${nombre}%`]
        );
        if(rows.length >0){
            return rows;

        }
        return null;
        
    }
    async obtenerResumenParaReporte(): Promise<Producto[] | null> {
        const [rows]: any = await pool.execute(
            "SELECT id, nombre, precio, fecha_caducidad, peso FROM productos ORDER BY fecha_caducidad ASC"
        );
        return rows.length > 0 ? rows : null;
    }

    async eliminar(id: number): Promise<void> {
        await pool.execute(
            "DELETE FROM productos WHERE id = ?",
            [id]
        );
    }

    async obtenerResumenGeneral(): Promise<any> {
        const [productos]: any = await pool.execute(
            "SELECT COUNT(*) as totalProductos, AVG(precio) as precioPromedio FROM productos"
        );

        const [categorias]: any = await pool.execute(
            "SELECT DISTINCT categoria FROM productos"
        );

        return {
            totalProductos: productos[0]?.totalProductos || 0,
            precioPromedio: productos[0]?.precioPromedio || 0,
            categorias: categorias.map((cat: any) => cat.categoria)
        };
    }

    async obtenerProductosPorCategoria(categoria: string): Promise<any> {
        const [productos]: any = await pool.execute(
            "SELECT * FROM productos WHERE categoria = ?",
            [categoria]
        );

        return productos;
    }

    async obtenerProductosProximosACaducar(dias: number): Promise<any> {
        const [productos]: any = await pool.execute(
            "SELECT * FROM productos WHERE fecha_caducidad <= DATE_ADD(CURDATE(), INTERVAL ? DAY)",
            [dias]
        );

        return productos;
    }
}