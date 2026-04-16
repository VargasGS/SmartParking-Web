
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '@app/models/GenericResponse';
import { TipoVehiculo } from "@app/models/tipo-vehiculo/tipo-vehiculo";
import { VehiculoCampo, VehiculoCampoRequest } from "@app/models/vehiculo-campo/vehiculo-campo";


@Injectable({
  providedIn: 'root'
})
export class VehiculoCampoApi {
    private readonly apiUrlController: string =`${environment.apiUrlSmartParking }/api/VehiculoCampo`;


    constructor(private http: HttpClient) {}

      guardarVehiculoCampo(item: any): Observable<any> {
        return this.http.post(this.apiUrlController, item);    
      }

      ObtenerVehiculoCampo(): Observable<GenericResponse<VehiculoCampoRequest[]>> {
      return this.http.get<GenericResponse<VehiculoCampoRequest[]>>(this.apiUrlController);
      }

      actualizarVehiculoCampo(item: any): Observable<any> {
        return this.http.put(this.apiUrlController, item);    
      }

    

/*
      getlistRecetaByCedula(cedula: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listRecetaByCedula/${cedula}`);
      }

  */  
     
}
