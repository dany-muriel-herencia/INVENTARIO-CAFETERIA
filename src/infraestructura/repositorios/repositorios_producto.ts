import { Producto } from "../../dominio/entidades/producto";

export class Repositorios_producto {
         

    async obtenerResumenParaReporte(): Promise<Producto []>  {
        return [];
    }
    guardar(): Promise<void> {
        return Promise.resolve();
    }
}