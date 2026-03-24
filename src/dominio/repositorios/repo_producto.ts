import { Producto } from "../entidades/producto";

export interface Repo_producto {
    guardar(producto: Producto): Promise<void>;
    obtenerTodos(): Promise<Producto[]>;
    buscarPorId(id: number): Promise<Producto | null>;
    buscarPorNombre(nombre: string): Promise<Producto[]>;
    obtenerResumenParaReporte(): Promise<Producto[]>;
}
