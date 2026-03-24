export class usuario {
    private readonly contrasena: string;
    private readonly id: number;
    private readonly correo: string;
    private nombre: string;

    constructor(contrasena: string, id: number, correo: string, nombre: string) {
        if (!contrasena || contrasena.trim().length < 6) {
            throw new Error("La contrasena debe tener al menos 6 caracteres");
        }
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("El id del usuario debe ser un numero entero positivo");
        }
        if (!correo || !correo.includes("@")) {
            throw new Error("El correo del usuario no es valido");
        }
        if (!nombre || nombre.trim().length === 0) {
            throw new Error("El nombre del usuario es obligatorio");
        }

        this.contrasena = contrasena;
        this.id = id;
        this.correo = correo.trim().toLowerCase();
        this.nombre = nombre.trim();
    }

    getnombre(): string {
        return this.nombre;
    }

    get_correo(): string {
        return this.correo;
    }

    get_id(): number {
        return this.id;
    }

    actualizar_nombre(nombre: string): void {
        if (!nombre || nombre.trim().length === 0) {
            throw new Error("El nombre del usuario es obligatorio");
        }

        this.nombre = nombre.trim();
    }

    validar_credenciales(correo: string, contrasena: string): boolean {
        return this.correo === correo.trim().toLowerCase() && this.contrasena === contrasena;
    }

    get_validacion(validar: boolean): boolean {
        return validar === true;
    }
}
