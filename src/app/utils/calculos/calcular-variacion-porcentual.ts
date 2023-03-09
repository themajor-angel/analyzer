export function calcularVariacionPorcentual(valorNuevo: number, valorAnterior: number) {
  return ((valorNuevo - valorAnterior) * 100) / Math.abs(valorAnterior);
}