
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '@app/models/GenericResponse';
import { TipoVehiculo } from "@app/models/tipo-vehiculo/tipo-vehiculo";
import { IngresoDia, VehiculoCampo, VehiculoCampoRequest } from "@app/models/vehiculo-campo/vehiculo-campo";


@Injectable({
  providedIn: 'root'
})
export class VehiculoCampoApi {
  private readonly apiUrlController: string = `${environment.apiUrlSmartParking}/api/VehiculoCampo`;


  constructor(private http: HttpClient) { }

  guardarVehiculoCampo(item: VehiculoCampo): Observable<GenericResponse<number>> {
    return this.http.post<GenericResponse<number>>(
      this.apiUrlController+'/Create',
      item
    );
  }

  ObtenerVehiculoCampo(): Observable<GenericResponse<VehiculoCampoRequest[]>> {
    return this.http.get<GenericResponse<VehiculoCampoRequest[]>>(this.apiUrlController+'/GetAll');
  }

  actualizarVehiculoCampo(item: any): Observable<any> {
    return this.http.put(this.apiUrlController+'/Finish', item);
  }

   ObtenerIngresosDia(): Observable<GenericResponse<IngresoDia>> {
    return this.http.get<GenericResponse<IngresoDia>>(this.apiUrlController+'/GetIngresosDia');
  }


}
