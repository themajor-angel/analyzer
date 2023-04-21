export interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    nitEmpresa: string;
    //nombreEmpresa: string;
    cargo: 'Contable' | 'Empresario' | null;
    ciudad: string;
    pais: string;
    telefono: string;
}

export interface Software {
    nombre: string;
}