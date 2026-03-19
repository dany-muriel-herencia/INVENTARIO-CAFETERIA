import { Producto } from "../../dominio/entidades/producto";
import { alertas } from "../../dominio/enumns/alertas";
import { Repositorios_producto } from "../../infraestructura/repositorios/repositorios_producto";
import { stock } from "../../dominio/entidades/stock";


export class agregar_producto {
    private repositorio_producto: Producto;

    constructor (historial_productos : Producto){
        if(!historial_productos){
            throw new Error("El producto no es válido");
        }
        if(historial_productos.getPrecio() <= 0){
            throw new Error("El precio del producto debe ser mayor a cero");
        }
        if(historial_productos.Fecha_caducidad <= 0){
            throw new Error("La fecha de caducidad debe ser válida");
        }
        if(historial_productos.Peso <= 0){
            throw new Error("El peso del producto debe ser mayor a cero");
        }
        
        this.repositorio_producto=historial_productos;
    }
    get_agregando_producto():Producto {
        return this.repositorio_producto;
    }

}