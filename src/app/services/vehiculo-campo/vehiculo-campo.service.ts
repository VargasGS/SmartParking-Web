
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { IngresoDia, VehiculoCampo, VehiculoCampoData, VehiculoCampoRequest } from "@app/models/vehiculo-campo/vehiculo-campo";
import { VehiculoCampoApi } from "./vehiculo-campo.api";
import { GenericResponse } from "@app/models/GenericResponse";



@Injectable({
    providedIn: 'root'
})
export class VehiculoCampoService extends VehiculoCampoData {

    constructor(private api: VehiculoCampoApi) {
        super();
    }

    guardarVehiculoCampo(item: VehiculoCampo): Observable<GenericResponse<number>> {
        return this.api.guardarVehiculoCampo(item);
    }

    obtenerVehiculoCampo(): Observable<VehiculoCampoRequest[]> {
        return this.api.ObtenerVehiculoCampo().pipe(
            map(res => res.data)
        );
    }

    actualizarVehiculoCampo(item: any): Observable<VehiculoCampo> {
        return this.api.actualizarVehiculoCampo(item);
    }


    ObtenerIngresosDia(): Observable<IngresoDia> {
        return this.api.ObtenerIngresosDia().pipe(
            map(res => res.data)
        );
    }
}
