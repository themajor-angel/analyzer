export interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    nitEmpresa: string;
    nombreEmpresa: string;
    cargo: 'contable' | 'empresario' | null;
    ciudad: string;
    pais: string;
}