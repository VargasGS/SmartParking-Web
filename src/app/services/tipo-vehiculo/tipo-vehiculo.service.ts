
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoVehiculoApi } from "./tipo-vehiculo.api";
import { Precio, TipoVehiculo , TipoVehiculoData} from "../../models/tipo-vehiculo/tipo-vehiculo";
import { map } from 'rxjs/operators';



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
    
    obtenerTipoVehiculo(): Observable<TipoVehiculo[]> {
        return this.api.ObtenerTipoVehiculo().pipe(
            map(res => res.data.map((x: any) => ({
            tipoVehiculoDescripcion: x.descripcionTipoVehiculo,
            idTipoVehiculo: x.idTipoVehiculo,
            precio: {
                IdPrecio: x.idPrecio,
                PrecioColones: Number(x.montoPrecioColones),
                PrecioDolares: Number(x.montoPrecioDolares)
            }
            })))
        );
    }

    actualizarPrecio(item: any): Observable<Precio> {
        return this.api.actualizarPrecio(item);
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
