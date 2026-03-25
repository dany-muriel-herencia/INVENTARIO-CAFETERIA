import { Producto } from "../../dominio/entidades/producto";
import {Repositorios_producto} from "../../infraestructura/repositorios/repositorios_producto";
import {alertas} from "../../dominio/enumns/alertas";
import {lote} from "../../dominio/entidades/lote";

export class Buscar_producto {
    constructor(private readonly repositorio_producto: Repositorios_producto) {}
    async buscarProductoPorId(id: string): Promise<Producto> {
        if (!id) {
            throw new Error("El ID del producto no es válido");
        }else{
            const producto = await this.repositorio_producto.buscarPorId(parseInt(id));
            if (!producto) {
                throw new Error("Producto no encontrado");
            }   
            return producto;
        }   
    }
}