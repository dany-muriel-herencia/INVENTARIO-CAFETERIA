import { Producto } from "../entidades/producto";

export interface Repo_producto {
    guardar(producto: Producto, categoria: string): Promise<void>;
    obtenerTodos(): Promise<Producto[]>;
    buscarPorId(id: number): Promise<Producto | null>;
    buscarPorNombre(nombre: string): Promise<Producto[] | null>;
    obtenerResumenParaReporte(): Promise<Producto[] | null>;
    eliminar(id: number ): Promise<void>;
}
