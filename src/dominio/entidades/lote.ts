import { Producto } from "./producto";

export class lote {
    private categoria : string ;

    private cantidad : number ;
    private productos :Producto[] ;
    constructor (productos :Producto[] ,categoria : string ){
        if(productos && categoria === null ){
            throw new Error("El lote no puede estar vacio");
        }
        this.productos=productos;
        this.categoria=categoria;
        this.cantidad=this.productos.length;
                
    }   



    get_categoria():string {
        return this.categoria;
    }

    get_cantidad():number {
        return this.cantidad;
    }

}
