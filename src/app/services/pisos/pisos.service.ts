
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PisosApi } from "./pisos.api";
import { Precio, TipoVehiculo, TipoVehiculoData } from "../../models/tipo-vehiculo/tipo-vehiculo";
import { map } from 'rxjs/operators';
import { Campo, Piso, PisoData, TipoCampo } from "@app/models/pisos/piso";
import { GenericResponse } from '@app/models/GenericResponse';




@Injectable({
    providedIn: 'root'
})
export class PisoService extends PisoData {

    constructor(private api: PisosApi) {
        super();
    }

    guardarCampo(item: Campo[]): Observable<GenericResponse<number>> {
        return this.api.guardarCampo(item);
    }

    guardarTipoCampo(item: TipoCampo): Observable<GenericResponse<number>> {
        return this.api.guardarTipoCampo(item);
    }

    obtenerCampo(): Observable<Campo[]> {
        return this.api.ObtenerCampo().pipe(
            map(res => (res?.data ?? []).map((x: any) => ({
                idCampo: x.idCampo,
                ley7600: x.discapacitados,
                idTipoCampo: 0, // 
                idPiso: x.idPiso,
                cantidadCampos: x.numeroCampo,

                piso: {
                    idPiso: x.idPiso,
                    numeroPiso: Number(x.piso),
                    estadoPiso: true // 
                },

                tipoCampo: {
                    idTipoCampo: 0,
                    tipoCampoDesc: x.descripcionTipoCampo
                }
            })))
        );
    }

    obtenerTipoCampo(): Observable<TipoCampo[]> {
        return this.api.ObtenerTipoCampo().pipe(
            map(res => res.data.map((x: any) => ({
                idTipoCampo: x.idTipoCampo,
                tipoCampoDesc: x.tipoCampoDesc
            })))
        );
    }




    eliminarTipoVehiculo(item: any): Observable<TipoVehiculo> {
        return this.api.eliminarTipoVehiculo(item);
    }
    /*
        listRecetaByCedula(cedula: number): Observable<EstadoReceta[]> {
            return this.api.getlistRecetaByCedula(cedula);  
        }
    
       */

}
