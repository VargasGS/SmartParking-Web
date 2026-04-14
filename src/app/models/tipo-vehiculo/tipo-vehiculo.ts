import { Observable } from "rxjs";

export interface Precio {
    IdPrecio:number; 
    PrecioColones: number;
    PrecioDolares: number;
}

export interface TipoVehiculo {
    tipoVehiculoDescripcion: string;
    idTipoVehiculo: number;
    precio: Precio;
}



export abstract class TipoVehiculoData {
    abstract guardarTipoVehiculo(item: TipoVehiculo): Observable<TipoVehiculo>;
    abstract obtenerTipoVehiculo(): Observable<TipoVehiculo[]>;
   // abstract listRecetaByCedula(cedula: number): Observable<EstadoReceta[]>;
}