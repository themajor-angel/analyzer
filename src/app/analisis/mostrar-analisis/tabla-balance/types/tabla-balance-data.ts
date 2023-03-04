export type ITipoSemaforo = 'verde' | 'amarillo' | 'rojo';

export type TablaBalanceYears = {
  id: string;
  nombre: string;
  valor: number;
}[];

export type TablaBalanceActivos = IFilaBalanceActivos[];

export interface IFilaBalanceActivos {
  id: string;
  nombre: string;
  descripcion?: string;
  variacionNeta: string;
  variacionPorcentual: string;
  porAnio: { [id: string]: string };
  styles?: { [id: string]: string };
  semaforoValor: ITipoSemaforo;
  semaforoTexto: string;
}