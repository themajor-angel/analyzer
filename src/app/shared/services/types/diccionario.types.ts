import { ITipoSemaforo } from "src/app/analisis/mostrar-analisis/tabla-balance/types";

export type IDatoPuc = {
  Clasificacion: string;
  Codigo: number;
  Descripcion: string;
  Nombre: string;
  Padre: number;
};

export type IValorPuc = {
  valorDatos1: number,
  valorDatos2: number,
  colorSemaforo: ITipoSemaforo,
  variacionNeta: number,
  variacionPorcentual: number,
};

export type IWrapperPuc = {
  codigoPuc: IDatoPuc;
  valorPuc: IValorPuc;
}