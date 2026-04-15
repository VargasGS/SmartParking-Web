
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '@app/models/GenericResponse';
import { TipoVehiculo } from "@app/models/tipo-vehiculo/tipo-vehiculo";


@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoApi {
    private readonly apiUrlController: string =`${environment.apiUrlSmartParking }/api/TipoVehiculo`;
    private readonly apiUrlControllerPrecio: string =`${environment.apiUrlSmartParking }/api/Precio`;


    constructor(private http: HttpClient) {}

      guardarTipoVehiculo(item: any): Observable<any> {
        return this.http.post(this.apiUrlController, item);    
      }

      ObtenerTipoVehiculo(): Observable<GenericResponse<TipoVehiculo[]>> {
      return this.http.get<GenericResponse<TipoVehiculo[]>>(this.apiUrlController);
      }

      actualizarPrecio(item: any): Observable<any> {
        return this.http.put(this.apiUrlControllerPrecio, item);    
      }

      eliminarTipoVehiculo(item: any): Observable<any> {
          return this.http.delete(this.apiUrlController, {
            body: item
          });
      }

/*
      getlistRecetaByCedula(cedula: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listRecetaByCedula/${cedula}`);
      }

  */  
     
}
