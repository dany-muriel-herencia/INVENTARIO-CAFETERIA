import { Repositorio_usuario } from "../../infraestructura/repositorios/respositorio_usuario";
import { BuscarUsuario } from "./buscar_usuario";

export class Login {
    private readonly repo_usuario: Repositorio_usuario;
    constructor(repositorio_usuario: Repositorio_usuario) {
        if (!repositorio_usuario) {
               throw new Error("El repositorio de usuarios no es válido");
        }
        this.repo_usuario = repositorio_usuario;
    }
    ejecutar(correo: string, contrasena: string) {
        const usuario = new BuscarUsuario(this.repo_usuario);
        return usuario.ejecutar(correo, contrasena);
    }

}