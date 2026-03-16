import { alertas } from "../enumns/alertas";

export class Producto {
    private id: number;
    private nombre: string ;
    private precio :number ;
    private fecha_caducidad:number ;
    private peso : number ;

constructor (id :number ,nombre :string ,precio :number ,fecha_caducidad : number  ,peso :number ){
    this.id=id;
    this.nombre = nombre ;
    this.precio=precio;
    this.fecha_caducidad=fecha_caducidad;
    this.peso=peso;

}
getPrecio():number  {
    return this.precio;
}
get Nombre():string {
    return this.nombre;
}
get Fecha_caducidad():number {
    return this.fecha_caducidad;
}
get Peso():number {
    return this.peso;
}
get Id():number {
    return this.id;
}


   }