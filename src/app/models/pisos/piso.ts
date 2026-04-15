import { Observable } from "rxjs";

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
    abstract guardarCampo(item: Piso): Observable<Piso>;
    abstract obtenerCampo(): Observable<Campo[]>;
    abstract guardarTipoCampo(item: TipoCampo): Observable<TipoCampo>;
    abstract obtenerTipoCampo(): Observable<TipoCampo[]>;
   // abstract listRecetaByCedula(cedula: number): Observable<EstadoReceta[]>;
}