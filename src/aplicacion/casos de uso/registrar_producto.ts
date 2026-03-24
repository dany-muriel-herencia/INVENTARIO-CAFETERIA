import { Producto } from "../../dominio/entidades/producto";
import { alertas } from "../../dominio/enumns/alertas";
import { Repositorios_producto } from "../../infraestructura/repositorios/repositorios_producto";
import { lote } from "../../dominio/entidades/lote";


export class agregar_producto {
    private repositorio_producto: Producto;
    
    constructor(historial_productos : Producto) {
        this.repositorio_producto=historial_productos;
    }
    
    async ejecutar():Promise<Producto> {
        if(!this.repositorio_producto){
            throw new Error("El producto no es válido");
        }
        if(this.repositorio_producto.getPrecio() <= 0){
            throw new Error("El precio del producto debe ser mayor a cero");
        }
        if(this.repositorio_producto.Fecha_caducidad <= 0){
            throw new Error("La fecha de caducidad debe ser válida");
        }
        if(this.repositorio_producto.Peso <= 0){
            throw new Error("El peso del producto debe ser mayor a cero");
        }
        const repositorio_producto = new Repositorios_producto();
        await repositorio_producto.guardar();   
        return this.repositorio_producto;
    }

}
