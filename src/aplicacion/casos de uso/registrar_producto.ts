import { Producto } from "../../dominio/entidades/producto";
import { alertas } from "../../dominio/enumns/alertas";
import { Repositorios_producto } from "../../infraestructura/repositorios/repositorios_producto";
import { lote } from "../../dominio/entidades/lote";


export class agregar_producto {
    private repositorio_producto: Repositorios_producto [] =[];
    
    constructor(historial_productos : Repositorios_producto[]) {
        this.repositorio_producto=historial_productos;
    }
    
    async ejecutar(producto : Producto):Promise<Producto> {
        if(!producto){
            throw new Error("El producto no es válido");
        }
        if(producto.getPrecio() <= 0){
            throw new Error("El precio del producto debe ser mayor a cero");
        }
        if(producto.Fecha_caducidad <= 0){
            throw new Error("La fecha de caducidad debe ser válida");
        }
        if(producto.Peso <= 0){
            throw new Error("El peso del producto debe ser mayor a cero");
        }
        const repositorio_producto = new Repositorios_producto();
        await repositorio_producto.guardar(producto);
        return producto;
    }

}
