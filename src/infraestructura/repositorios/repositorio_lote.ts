
import { Producto } from "../../dominio/entidades/producto";
import { lote } from "../../dominio/entidades/lote";
import { repo_lote } from "../../dominio/repositorios/repo_lote";

export class Repositorio_lote implements repo_lote {            
    async guardar(lote: lote): Promise<void> {

    }
    async obtenerTodos(): Promise<lote[]> {

        return [];
    }
    async get_cantidad(): Promise<number> {

        return 0;
    }
    async get_proximos_a_vencer(): Promise<number> {

        return 0;
    }
    async get_almacenamiento(): Promise<number> {

        return 0;
    }

}
