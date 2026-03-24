import { lote } from "../entidades/lote";

export interface Repo_lote {
    guardar(lote: lote): Promise<void>;
    obtenerTodos(): Promise<lote[]>;
    get_cantidad(): Promise<number>;
    get_proximos_a_vencer(): Promise<number>;
    get_almacenamiento(): Promise<number>;
}
