
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { VehiculoCampo, VehiculoCampoData,VehiculoCampoRequest } from "@app/models/vehiculo-campo/vehiculo-campo";
import { VehiculoCampoApi } from "./vehiculo-campo.api";



@Injectable({
    providedIn: 'root'
})
export class VehiculoCampoService extends VehiculoCampoData {

    constructor(private api: VehiculoCampoApi) {
        super();
    }

    guardarVehiculoCampo(item: any): Observable<VehiculoCampo> {
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
   


}
