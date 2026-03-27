import { pool } from "../base_de_datos/conexion_mysql";
import { Repo_usuario } from "../../dominio/repositorios/repo_usuario";
import { usuario } from "../../dominio/entidades/usuario";

export class Repositorio_usuario implements Repo_usuario {
    async guardar(usuario: usuario): Promise<void> {
        await pool.execute(
            
                 "INSERT INTO usuarios (id, nombre, correo, contrasena) VALUES (?, ?, ?, ?)",
                 [
                    usuario.get_id(),
                    usuario.getnombre(),
                    usuario.get_correo(),
                    usuario.contraseña
                ]
            
        );
    }
    
    async buscar_por_correo(correo: string): Promise<usuario | null> {
        const [rows]: any = await pool.execute(
            "SELECT * FROM usuarios WHERE correo = ?",
            [correo]
        );
        if (rows.length > 0) {
            const user = rows[0];
            return new usuario(user.id, user.nombre, user.correo, user.contrasena);
        }
        return null;
    }
    async obtener_contrasena(correo: string): Promise<string | null> {
        const [rows]: any = await pool.execute(
            "SELECT contrasena FROM usuarios WHERE correo = ?",
            [correo]
        );
        return rows.length > 0 ? rows[0].contrasena : null;

    }

    async obtener_correo(correo: string): Promise<usuario | null> {
        const [rows]: any = await pool.execute(
            "SELECT * FROM usuarios WHERE correo = ?",
            [correo]
        );
        if (rows.length > 0) {
            const user = rows[0];
            return new usuario(user.id, user.nombre, user.correo, user.contrasena);
        }
        return null;

    }

}