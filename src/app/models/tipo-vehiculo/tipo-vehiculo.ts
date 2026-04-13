import { Observable } from "rxjs";

export interface TipoVehiculo {
    descripcionTipoVehiculo:string;  
    idTipoVehiculo:number;  
    idPrecio:number;
    montoPrecioColones: number;
    montoPrecioDolares:number;
}


export abstract class TipoVehiculoData {
    abstract guardarTipoVehiculo(item: TipoVehiculo): Observable<TipoVehiculo>;
   // abstract listRecetasActivas(): Observable<RecetaActiva[]>;
   // abstract listRecetaByCedula(cedula: number): Observable<EstadoReceta[]>;
}