


export class usuario{
     private constraseña : string;
     private id :number ;
     private correo : string ;
     private nombre : string; 


    constructor (contraseña :string ,id :number ,correo :string ,nombre :string ){
        this.constraseña=contraseña;
        this.id=id;
        this.correo=correo;
        this.nombre=nombre;
    }
     
     
     
     
     getnombre ():string {
        return this.nombre;
     }
     get_correo():string  {
        return this.correo;
     }
     get_id():number{
        return this.id;
     }
     get_validacion(validar:boolean):boolean {
        if(validar ==true){
            return true ;
        }else{
            return false ;
        }

     }

}


