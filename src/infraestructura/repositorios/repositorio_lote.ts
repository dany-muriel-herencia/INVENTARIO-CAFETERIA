
import { Producto } from "../../dominio/entidades/producto";
import { lote } from "../../dominio/entidades/lote";


export class Repositorio_lote {            



    async almacenamiento (): Promise<[]>  {
        
        return [];
    }


    async get_cantidad (): Promise<number>  {
        return 0;
    }   
    get_proximos_a_vencer (): Promise<number> {
        return Promise.resolve(0);
    }
    async get_almacenamiento(): Promise<number> {
        return Promise.resolve(0);
    }

}
