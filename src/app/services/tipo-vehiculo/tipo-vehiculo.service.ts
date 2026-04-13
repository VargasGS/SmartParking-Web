
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoVehiculoApi } from "./tipo-vehiculo.api";
import { TipoVehiculo , TipoVehiculoData} from "../../models/tipo-vehiculo/tipo-vehiculo";




@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService extends TipoVehiculoData {
   
    constructor(private api: TipoVehiculoApi) {
        super();
    }

    guardarTipoVehiculo(item: any): Observable<TipoVehiculo> {
        return this.api.guardarTipoVehiculo(item);
      }
  /*  
    listRecetasActivas(): Observable<RecetaActiva[]> {
        return this.api.listRecetasActivas();  
    }

    listRecetaByCedula(cedula: number): Observable<EstadoReceta[]> {
        return this.api.getlistRecetaByCedula(cedula);  
    }

   */ 
     
}
