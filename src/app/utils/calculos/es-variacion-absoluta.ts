export function esVariacionAbsoluta(valorNuevo: number, valorAnterior: number) {
  const nuevoEsNegativo = valorNuevo < 0;
  const anteriorEsNegativo = valorAnterior < 0;
  return !nuevoEsNegativo && anteriorEsNegativo;
}