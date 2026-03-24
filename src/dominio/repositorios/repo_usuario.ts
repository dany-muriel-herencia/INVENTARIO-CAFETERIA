import { usuario } from "../entidades/usuario";

export interface Repo_usuario {
    guardar(usuario: usuario): Promise<void>;
    buscar_por_correo(correo: string): Promise<usuario | null>;
    validar_usuario(correo: string, contrasena: string): Promise<boolean>;
}
