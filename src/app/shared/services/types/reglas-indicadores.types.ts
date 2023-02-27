import { ITipoSemaforo } from 'src/app/analisis/mostrar-analisis/tabla-balance/types';

export type IStatusIndicador = {
  status?: ITipoSemaforo;
  mensaje?: string;
};

export type IReglaIndicador = (a: number, b: number) => IStatusIndicador;
