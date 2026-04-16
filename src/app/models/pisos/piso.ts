import { Observable } from "rxjs";
import { GenericResponse } from "../GenericResponse";

export interface Campo {
  idCampo: number;
  ley7600: boolean;
  cantidadCampos: number;
  idPiso: number;
  idTipoCampo:number;
  piso: Piso;
  tipoCampo: TipoCampo;
}

export interface Piso {
  idPiso: number;
  numeroPiso: number;
  estadoPiso: boolean;
}

export interface TipoCampo {
  idTipoCampo: number;
  tipoCampoDesc: string;
}

export abstract class PisoData {
    abstract guardarCampo(item: Campo[]): Observable<GenericResponse<number>>;
    abstract obtenerCampo(): Observable<Campo[]>;
    abstract guardarTipoCampo(item: TipoCampo): Observable<GenericResponse<number>>;
    abstract obtenerTipoCampo(): Observable<TipoCampo[]>;
   // abstract listRecetaByCedula(cedula: number): Observable<EstadoReceta[]>;
}