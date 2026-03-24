import { Producto } from "./producto";

export class lote {
    private readonly categoria: string;
    private productos: Producto[];

    constructor(productos: Producto[], categoria: string) {
        if (!Array.isArray(productos)) {
            throw new Error("Los productos del lote no son validos");
        }
        if (!categoria || categoria.trim().length === 0) {
            throw new Error("La categoria del lote es obligatoria");
        }

        this.productos = [...productos];
        this.categoria = categoria.trim();
    }

    get_categoria(): string {
        return this.categoria;
    }

    get_cantidad(): number {
        return this.productos.length;
    }

    get_productos(): Producto[] {
        return [...this.productos];
    }

    agregar_producto(producto: Producto): void {
        this.productos.push(producto);
    }

    eliminar_producto(idProducto: number): void {
        const cantidadInicial = this.productos.length;
        this.productos = this.productos.filter((producto) => producto.Id !== idProducto);

        if (this.productos.length === cantidadInicial) {
            throw new Error("No existe un producto con ese id dentro del lote");
        }
    }

    esta_bajo_minimo(minimo: number = 10): boolean {
        if (!Number.isInteger(minimo) || minimo < 0) {
            throw new Error("El minimo del lote debe ser un numero entero no negativo");
        }

        return this.get_cantidad() <= minimo;
    }

    obtener_productos_proximos_a_vencer(diasLimite: number = 7, fechaActual: Date = new Date()): Producto[] {
        return this.productos.filter((producto) => producto.estaProximoAVencer(diasLimite, fechaActual));
    }
}
