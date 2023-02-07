export type ITipoSemaforo = 'verde' | 'amarillo' | 'rojo';

export type TablaBalanceYears = {
  id: string;
  nombre: string;
}[];

export type TablaBalanceActivos = {
  id: string;
  nombre: string;
  variacionNeta: string;
  variacionPorcentual: string;
  porAnio: { [id: string]: string };
  styles: { [id: string]: string };
  semaforoValor: ITipoSemaforo;
  semaforoTexto: string;
}[];
