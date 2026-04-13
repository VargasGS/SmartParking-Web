
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoApi {
    private readonly apiUrlController: string =`${environment.apiUrlSmartParking }/api/TipoVehiculo`;


    constructor(private http: HttpClient) {}

      guardarTipoVehiculo(item: any): Observable<any> {
        return this.http.post(this.apiUrlController, item);    
      }
/*
      listRecetasActivas(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listRecetasActivas`);
      }


      getlistRecetaByCedula(cedula: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listRecetaByCedula/${cedula}`);
      }

  */  
     
}
