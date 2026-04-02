
import { Producto } from "../dominio/entidades/producto";
import { Generar_alertas } from "../aplicacion/casos de uso/generar_alertas";
import { alertas } from "../dominio/enumns/alertas";
import { Request, Response } from "express";
import { Repositorio_lote } from "../infraestructura/repositorios/repositorio_lote";
import { Repositorios_producto } from "../infraestructura/repositorios/repositorios_producto";

export class controllers_alertas {
    private readonly generar_alertas: Generar_alertas;
    
    constructor(repo_producto: Repositorios_producto, repo_lotes: Repositorio_lote) {
        this.generar_alertas = new Generar_alertas(repo_lotes, repo_producto);
    }

  
    async obtener_todas(req: Request, res: Response): Promise<void> {
        try {
            const alertas_resultado = await this.generar_alertas.alertas_generales();
            res.status(200).json({
                message: "Alertas obtenidas correctamente",
                alertas: alertas_resultado
            });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }


    async generar(req: Request, res: Response): Promise<void> {
        try {
            const alertas_resultado = await this.generar_alertas.alertas_generales();
            res.status(200).json({
                message: "Alertas generadas correctamente",
                alertas: alertas_resultado
            });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }


    async verificar_lote_bajo(req: Request, res: Response): Promise<void> {
        try {
            const alerta = await this.generar_alertas.Lote_bajo();
            res.status(200).json({
                message: "Verificación de lote bajo completada",
                alerta: alerta
            });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }


    async verificar_proximos_a_vencer(req: Request, res: Response): Promise<void> {
        try {
            const alerta = await this.generar_alertas.Productos_proximos_a_vencer();
            res.status(200).json({
                message: "Verificación de productos próximos a vencer completada",
                alerta: alerta
            });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

  
    async verificar_almacenamiento(req: Request, res: Response): Promise<void> {
        try {
            const alerta = await this.generar_alertas.almacenamiento_lleno();
            res.status(200).json({
                message: "Verificación de almacenamiento completada",
                alerta: alerta
            });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
} 