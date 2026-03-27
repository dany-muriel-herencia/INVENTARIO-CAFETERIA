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
    async obtenerResumenParaReporte(): Promise<Producto[]| null > {
        
        return Promise.resolve([]);
    }
}