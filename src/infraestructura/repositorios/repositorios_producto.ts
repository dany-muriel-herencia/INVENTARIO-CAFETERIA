import { Producto } from "../../dominio/entidades/producto";
import { Repo_producto } from "../../dominio/repositorios/repo_producto";


export class Repositorios_producto implements Repo_producto {
         
    async guardar(producto: Producto): Promise<void> {
        return Promise.resolve();
    }
    async obtenerTodos(): Promise<Producto[]> {
        return Promise.resolve([]);
    }
    buscarPorId(id: number): Promise<Producto | null> {
        return Promise.resolve(null);
    }
    buscarPorNombre(nombre: string): Promise<Producto[]> {
        return Promise.resolve([]);
    }
    obtenerResumenParaReporte(): Promise<Producto[]> {
        return Promise.resolve([]);
    }
}