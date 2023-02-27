export type IIndicador = {
  clase: string;
  id: string;
  nombre: string;
  descripcion: string;
};

export type IValorIndicador = {
  prop: string;
  status: string;
  dif: number;
};

export type IIndicadorConValor = IIndicador & IValorIndicador;

export type ICategoriaIndicador = {
  id: string;
  nombre: string;
  descripcion: string;
}