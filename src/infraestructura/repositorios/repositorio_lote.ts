
import { lote } from "../../dominio/entidades/lote";
import { Producto } from "../../dominio/entidades/producto";
import { repo_lote } from "../../dominio/repositorios/repo_lote";
import { pool } from "../base_de_datos/conexion_mysql";

export class Repositorio_lote implements repo_lote {
    async guardar(nuevoLote: lote): Promise<void> {
        await pool.execute(
            "INSERT INTO lotes (categoria, cantidad) VALUES (?, ?)",
            [nuevoLote.get_categoria(), nuevoLote.get_cantidad()]
        );
        
    }

    async obtenerTodos(): Promise<lote[]> {
        const [rows] = await pool.query(
            `SELECT
                l.id,
                l.categoria,
                p.id AS producto_id,
                p.nombre,
                p.precio,
                p.fecha_caducidad,
                p.peso
            FROM lotes l
            LEFT JOIN productos p ON p.lote_id = l.id
            ORDER BY l.id, p.id`
        );

        const lotesMap = new Map<number, { categoria: string; productos: Producto[] }>();

        for (const row of rows as LoteConProductosRow[]) {
            if (!lotesMap.has(row.id)) {
                lotesMap.set(row.id, {
                    categoria: row.categoria,
                    productos: [],
                });
            }

            if (row.producto_id !== null) {
                lotesMap.get(row.id)?.productos.push(
                    new Producto(
                        row.producto_id,
                        row.nombre,
                        Number(row.precio),
                        row.fecha_caducidad,
                        Number(row.peso)
                    )
                );
            }
        }

        return Array.from(lotesMap.values()).map(
            (loteRow) => new lote(loteRow.productos, loteRow.categoria)
        );
        
    }

    async get_cantidad(): Promise<number> {
        const [rows] = await pool.query(
            "SELECT COALESCE(SUM(cantidad), 0) AS total FROM lotes"
        );

        const [row] = rows as TotalRow[];
        return Number(row?.total ?? 0);
    }

    async get_proximos_a_vencer(): Promise<number> {
        const hoy = Date.now();
        const sieteDiasEnMs = 7 * 24 * 60 * 60 * 1000;
        const limite = hoy + sieteDiasEnMs;

        const [rows] = await pool.query(
            `SELECT COUNT(*) AS total
            FROM productos
            WHERE fecha_caducidad >= ? AND fecha_caducidad <= ?`,
            [hoy, limite]
        );

        const [row] = rows as TotalRow[];
        return Number(row?.total ?? 0);
    }

    async get_almacenamiento(): Promise<number> {
        const [rows] = await pool.query(
            "SELECT COALESCE(SUM(peso), 0) AS total FROM productos"
        );

        const [row] = rows as TotalRow[];
        return Number(row?.total ?? 0);
    }
    async get_lote_id(categoria: string):Promise<number | null>{
        const [rows] : any  = await pool.query(
            "SELECT id FROM lotes WHERE categoria = ?",
            [categoria]
        );
        if(rows.length >0){
            return rows[0].id;
        }
        return null;
    }
}

type TotalRow = {
    total: number | string;
};

type LoteConProductosRow = {
    id: number;
    categoria: string;
    producto_id: number | null;
    nombre: string;
    precio: number | string;
    fecha_caducidad: number;
    peso: number | string;
};
