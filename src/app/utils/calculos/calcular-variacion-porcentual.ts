export function calcularVariacionPorcentual(valorNuevo: number, valorAnterior: number) {
  if (Math.sign(valorNuevo) * Math.sign(valorAnterior) === -1) return NaN;
  return ((valorNuevo - valorAnterior) * 100) / Math.abs(valorAnterior);
}