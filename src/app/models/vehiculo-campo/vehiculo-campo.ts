import { GenericResponse } from "../GenericResponse";
import { Campo } from "../pisos/piso";
import { TipoVehiculo } from "../tipo-vehiculo/tipo-vehiculo";
import { Observable } from "rxjs";

export interface VehiculoCampo{
   idVehiculoCampo: number,
   idVehiculo: number,
   idCampo: number,
   fechaIngreso: Date,
   montoTotalColones: number,
   montoTotalDolares: number,
   estado: boolean,
   vehiculo: Vehiculo,
   campo: Campo

}

export interface Vehiculo{
    idVehiculo:number,
    placa: string,
    idTipoVehiculo: number,
    tipoVehiculo: TipoVehiculo

}

export interface VehiculoCampoRequest{
    idVehiculoCampo: number,
    matricula:string,
    fechaProceso:Date,
    descripcionTipoVehiculo:string,
    montoPrecioColones: number,
    montoPrecioDolares: number,

}
export interface IngresoDia{
    ingresosColones:number,
    ingresosDolares:number
}

export abstract class VehiculoCampoData {
    abstract guardarVehiculoCampo(item: VehiculoCampo): Observable<GenericResponse<number>>;
    abstract obtenerVehiculoCampo(): Observable<VehiculoCampoRequest[]>;
    abstract ObtenerIngresosDia(): Observable<IngresoDia[]>;


    //abstract actualizarVehiculoCampo(): Observable<VehiculoCampo[]>;
   // abstract listRecetaByCedula(cedula: number): Observable<EstadoReceta[]>;
}

