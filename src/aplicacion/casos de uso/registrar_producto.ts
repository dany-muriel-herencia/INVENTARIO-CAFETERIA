import { Producto } from "../../dominio/entidades/producto";
import { Repositorios_producto } from "../../infraestructura/repositorios/repositorios_producto";


export class agregar_producto {
    private readonly repositorio_producto: Repositorios_producto;
    
    constructor(repositorio_producto: Repositorios_producto) {
        if (!repositorio_producto) {
            throw new Error("El repositorio de productos no es válido");
        }
        this.repositorio_producto = repositorio_producto;
    }
    
    async ejecutar(producto: Producto): Promise<Producto> {
        if (!producto) {
            throw new Error("El producto no es válido");
        }
        if (producto.getPrecio() <= 0) {
            throw new Error("El precio del producto debe ser mayor a cero");
        }
        if (producto.Fecha_caducidad <= 0) {
            throw new Error("La fecha de caducidad debe ser válida");
        }
        if (producto.Peso <= 0) {
            throw new Error("El peso del producto debe ser mayor a cero");
        }
        await this.repositorio_producto.guardar(producto);
        return producto;
    }
}
