export interface ProductoResumen {
    id: string;
    nombre: string;
    precio: number;
    fecha_caducidad: number;
    peso: number;
}

export interface ProductoRegistro {
    id: number;
    nombre: string;
    precio: number;
    fecha_caducidad: number;
    peso: number;
}

export interface ReporteEstadoInventario {
    totalProductos: number;
    productosVencidos: number;
    productosPorVencer: number;
    lotesBajos: number;
}
