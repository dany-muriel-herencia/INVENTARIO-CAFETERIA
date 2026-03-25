import { Repositorio_usuario } from "../../infraestructura/repositorios/respositorio_usuario";  

export class BuscarUsuario {
    private readonly repo_usuario: Repositorio_usuario;
    constructor(repositorio_usuario: Repositorio_usuario) {
        if (!repositorio_usuario) {
            throw new Error("El repositorio de usuarios no es válido");
        }
        this.repo_usuario = repositorio_usuario;
    }
    ejecutar(correo: string ,contrasena: string) {
        if (!correo || !correo.includes("@")) {
            throw new Error("El correo no es válido");
        }
        if (!contrasena) {
            throw new Error("La contraseña no es válida");
        }
        return this.repo_usuario.buscar_por_correo(correo);
    }
}