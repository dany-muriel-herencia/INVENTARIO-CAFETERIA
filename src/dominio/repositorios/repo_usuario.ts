import { usuario } from "../entidades/usuario";

export interface Repo_usuario {
    guardar(usuario: usuario): Promise<void>;
    buscar_por_correo(correo: string): Promise<usuario | null>;
    obtener_contrasena(correo: string): Promise<string | null>;
    obtener_correo(correo: string): Promise<usuario | null>;
    eliminar(id: number ): Promise<void>;
}
