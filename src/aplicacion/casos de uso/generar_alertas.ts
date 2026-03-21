import { Producto } from "../../dominio/entidades/producto";
import {Repositorios_producto} from "../../infraestructura/repositorios/repositorios_producto";
import {alertas} from "../../dominio/enumns/alertas";
import {lote} from "../../dominio/entidades/lote";
import {Repositorio_lote} from "../../infraestructura/repositorios/repositorio_lote";


export class Generar_alertas {
    
    async Lote_bajo():Promise<alertas>{
        const repositorio_lote = new Repositorio_lote();
        if(await repositorio_lote.get_cantidad() <= 10){
            return alertas.lote_bajo;
        }
        return alertas.cantidad_estandar;

    }
    async Productos_proximos_a_vencer():Promise<alertas>{
        const repositorio_lote = new Repositorio_lote();

        return alertas.cantidad_estandar;
        
    }
}
