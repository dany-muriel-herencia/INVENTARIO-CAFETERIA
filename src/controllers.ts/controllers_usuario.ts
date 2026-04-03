import { Repositorio_usuario } from "../infraestructura/repositorios/respositorio_usuario";
import { BuscarUsuario } from "../aplicacion/casos de uso/buscar_usuario";
import { Login } from "../aplicacion/casos de uso/login";
import { Request, Response } from "express";


export class controllers_usuario {
    private readonly login_case: Login;
    private readonly buscar_usuario: BuscarUsuario;

    constructor(repo_usuario: Repositorio_usuario) {
        this.login_case = new Login(repo_usuario);
        this.buscar_usuario = new BuscarUsuario(repo_usuario);
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { correo, contrasena } = req.body;
            if (!correo || !contrasena) {
                res.status(400).json({ error: "Correo y contraseña son requeridos" });
                return;
            }
            const usuario = await this.login_case.ejecutar(correo, contrasena);
            res.status(200).json({
                mensaje: "Usuario autenticado correctamente",
                usuario: usuario
            });
        } catch (error) {
            res.status(401).json({ error: (error as Error).message });
        }
    }

    async buscar(req: Request, res: Response): Promise<void> {
        try {
            const { correo, contrasena } = req.body;
            if (!correo || !contrasena) {
                res.status(400).json({ error: "Correo y contraseña son requeridos" });
                return;
            }
            const usuario = await this.buscar_usuario.ejecutar(correo, contrasena);
            res.status(200).json({
                mensaje: "Usuario encontrado correctamente",
                usuario: usuario
            });
        } catch (error) {
            res.status(404).json({ error: (error as Error).message });
        }
    }
}