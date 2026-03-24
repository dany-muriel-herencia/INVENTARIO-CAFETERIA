export class Producto {
    private readonly id: number;
    private nombre: string;
    private precio: number;
    private fecha_caducidad: number;
    private peso: number;

    constructor(id: number, nombre: string, precio: number, fecha_caducidad: number, peso: number) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("El id del producto debe ser un numero entero positivo");
        }
        if (!nombre || nombre.trim().length === 0) {
            throw new Error("El nombre del producto es obligatorio");
        }
        if (!Number.isFinite(precio) || precio <= 0) {
            throw new Error("El precio del producto debe ser mayor a cero");
        }
        if (!Number.isFinite(fecha_caducidad) || fecha_caducidad <= 0) {
            throw new Error("La fecha de caducidad del producto no es valida");
        }
        if (!Number.isFinite(peso) || peso <= 0) {
            throw new Error("El peso del producto debe ser mayor a cero");
        }

        this.id = id;
        this.nombre = nombre.trim();
        this.precio = precio;
        this.fecha_caducidad = fecha_caducidad;
        this.peso = peso;
    }

    getPrecio(): number {
        return this.precio;
    }

    get Nombre(): string {
        return this.nombre;
    }

    get Fecha_caducidad(): number {
        return this.fecha_caducidad;
    }

    get Peso(): number {
        return this.peso;
    }

    get Id(): number {
        return this.id;
    }

    actualizarPrecio(nuevoPrecio: number): void {
        if (!Number.isFinite(nuevoPrecio) || nuevoPrecio <= 0) {
            throw new Error("El nuevo precio debe ser mayor a cero");
        }

        this.precio = nuevoPrecio;
    }

    actualizarNombre(nuevoNombre: string): void {
        if (!nuevoNombre || nuevoNombre.trim().length === 0) {
            throw new Error("El nombre del producto es obligatorio");
        }

        this.nombre = nuevoNombre.trim();
    }

    estaVencido(fechaActual: Date = new Date()): boolean {
        return this.fecha_caducidad < fechaActual.getTime();
    }

    estaProximoAVencer(diasLimite: number = 7, fechaActual: Date = new Date()): boolean {
        if (!Number.isInteger(diasLimite) || diasLimite < 0) {
            throw new Error("El limite de dias debe ser un numero entero no negativo");
        }

        const milisegundosPorDia = 24 * 60 * 60 * 1000;
        const fechaLimite = fechaActual.getTime() + diasLimite * milisegundosPorDia;

        return this.fecha_caducidad >= fechaActual.getTime() && this.fecha_caducidad <= fechaLimite;
    }
}
