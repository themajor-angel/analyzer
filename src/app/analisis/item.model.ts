export interface Item {
    codigo: string;
    nombre: string;
    saldo: number;
}

export interface Regla {
    codigo: string;
    compararCon: '1'
}

export interface ComparacionItems {
    codigo: string;
    nombre: string;
    anios: {
        idAnio: string,
        nombreAnio: string,
        saldo: number
    }[]
    semaforo: string;
}

