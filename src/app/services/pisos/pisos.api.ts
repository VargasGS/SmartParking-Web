
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '@app/models/GenericResponse';
import { Campo, Piso, TipoCampo } from "@app/models/pisos/piso";


@Injectable({
  providedIn: 'root'
})
export class PisosApi {
  private readonly apiUrlController: string = `${environment.apiUrlSmartParking}/api/Campo`;
  private readonly apiUrlControllerTipoCampo: string = `${environment.apiUrlSmartParking}/api/TipoCampo`;


  constructor(private http: HttpClient) { }

  guardarCampo(item: Campo[]): Observable<GenericResponse<number>> {
      return this.http.post<GenericResponse<number>>(
      this.apiUrlController,
      item
    );
  }

  guardarTipoCampo(item: TipoCampo): Observable<GenericResponse<number>> {
    return this.http.post<GenericResponse<number>>(
      this.apiUrlControllerTipoCampo,
      item
    );
  }
  ObtenerCampo(): Observable<GenericResponse<Campo[]>> {
    return this.http.get<GenericResponse<Campo[]>>(this.apiUrlController);
  }

  ObtenerTipoCampo(): Observable<GenericResponse<TipoCampo[]>> {
    return this.http.get<GenericResponse<TipoCampo[]>>(this.apiUrlControllerTipoCampo);
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
