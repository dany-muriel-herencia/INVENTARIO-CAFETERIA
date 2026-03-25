
import { Repo_usuario } from "../../dominio/repositorios/repo_usuario";
import { usuario } from "../../dominio/entidades/usuario";

export class Repositorio_usuario implements Repo_usuario {
    async guardar(usuario: usuario): Promise<void> {

    }
    async buscar_por_correo(correo: string): Promise<usuario | null> {

        return null;
    }
    async validar_usuario(correo: string, contrasena: string): Promise<boolean> {

        return false;
    }

}