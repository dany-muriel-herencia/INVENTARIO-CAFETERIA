import { Producto } from "../../dominio/entidades/producto";
import { alertas } from "../../dominio/enumns/alertas";
import { Repositorios_producto } from "../../infraestructura/repositorios/repositorios_producto";
import { stock } from "../../dominio/entidades/stock";


export class Registrar_producto {
    private repositorio_producto: Repositorios_producto[];

    constructor (historial_productos : Repositorios_producto[] ){
        this.repositorio_producto=historial_productos;
    }
    agregar_productos(producto: Producto):void {
        let producto
       
    }
}