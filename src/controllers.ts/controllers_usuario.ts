import { Repo_usuario } from "../dominio/repositorios/repo_usuario";
import { BuscarUsuario } from "../aplicacion/casos de uso/buscar_usuario";
import { Request ,Response } from "express";


export class constrollers_usuario{
    private readonly buscar_usuario: BuscarUsuario;
    constructor(repo_usuario : Repo_usuario) {
        this.buscar_usuario = new BuscarUsuario(repo_usuario);
    }

    async buscar(req : Request, res : Response ):Promise<void>{
        const buscar_usuario = this.buscar_usuario.ejecutar(req.body.correo, req.body.contrasena);
        try {
            const usuario = await buscar_usuario;
            res.status(200).json({
                mensaje :"usuario encontrado correctamente ",
                usuario: usuario 
            })
        }catch(error){
            res.status(500).json({ error: (error as Error).message });
        }
    }
}