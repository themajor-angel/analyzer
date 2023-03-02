import { ExcelInfo } from 'src/app/analisis/item.model';
import { ITipoSemaforo } from 'src/app/analisis/mostrar-analisis/tabla-balance/types';

export type IStatusDiccionario = {
  status?: ITipoSemaforo;
};

export type IReglaDiccionario = (excelNuevo: ExcelInfo, excelAnterior: ExcelInfo, idPuc: string) => IStatusDiccionario;
