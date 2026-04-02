import { Producto } from "../../dominio/entidades/producto";
import {Repositorios_producto} from "../../infraestructura/repositorios/repositorios_producto";
import {alertas} from "../../dominio/enumns/alertas";
import {lote} from "../../dominio/entidades/lote";
import {Repositorio_lote} from "../../infraestructura/repositorios/repositorio_lote";


export class Generar_alertas {
    private repositorio_lote: Repositorio_lote;
    private repositorio_producto: Repositorios_producto;

    constructor(repositorio_lote: Repositorio_lote, repositorio_producto: Repositorios_producto) {
        this.repositorio_lote = repositorio_lote;
        this.repositorio_producto = repositorio_producto;
    }
    
    async Lote_bajo():Promise<alertas>{
        if(await this.repositorio_lote.get_cantidad() <= 10){
            return alertas.lote_bajo;
        }
        return alertas.cantidad_estandar;

    }
    async Productos_proximos_a_vencer():Promise<alertas>{
        const fecha  = new Date();
        const dia = fecha.getDate() + 7 ;
        const mes  = fecha.getMonth() + 1;
        const anio = fecha.getFullYear(); 
        if( 
            await this.repositorio_lote.get_proximos_a_vencer() <= dia &&
            await this.repositorio_lote.get_proximos_a_vencer() <= mes &&
            await this.repositorio_lote.get_proximos_a_vencer() <= anio 
        
        ){
            return alertas.Productos_proximos_a_vencer;
        }
        return alertas.fecha_saludable;
        
    }
    async almacenamiento_lleno():Promise<alertas>{
        if(await this.repositorio_lote.get_almacenamiento() >= 100){
            return alertas.Almacenamiento_lleno;
        }
        return alertas.Almacenamiento_saludable;

    }



    async alertas_generales():Promise<alertas[]>{
        const alertas_generales: alertas[] = [];
        const alerta_lote_bajo = await this.Lote_bajo();
        const alerta_productos_proximos_a_vencer = await this.Productos_proximos_a_vencer();
        const alerta_almacenamiento_lleno = await this.almacenamiento_lleno();

        alertas_generales.push(alerta_lote_bajo);   
        alertas_generales.push(alerta_productos_proximos_a_vencer);
        alertas_generales.push(alerta_almacenamiento_lleno);
        return alertas_generales;
    }
}
