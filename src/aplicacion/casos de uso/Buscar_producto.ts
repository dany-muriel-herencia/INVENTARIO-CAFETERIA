import { Repositorios_producto } from "../../infraestructura/repositorios/repositorios_producto";
import { Producto } from "../../dominio/entidades/producto";
import { ProductoResumen } from "../../dominio/enumns/Producto";
// Interfaz para el resumen del producto


export class BuscarProducto {
    private repositorioProducto: Repositorios_producto;

    constructor(repositorioProducto: Repositorios_producto) {
        if (!repositorioProducto) {
            throw new Error("El repositorio de productos no es válido");
        }
        this.repositorioProducto = repositorioProducto;
    }
    async obtenerProductos(): Promise<ProductoResumen[]> {
        try {
            const productos= await this.repositorioProducto.obtenerResumenParaReporte();
            return productos.map(producto=>({
                id : producto.Id.toString(),
                nombre : producto.Nombre ,
                precio : producto.getPrecio(),
                fecha_caducidad : producto.Fecha_caducidad ,
                peso : producto.Peso ,

            }))

        }catch(error){
            throw new Error(" no se puede realizar este proceso ...");
        }
    }
  
}