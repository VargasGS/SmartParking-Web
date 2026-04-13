import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoVehiculoData } from '@app/models/tipo-vehiculo/tipo-vehiculo';
import { TipoVehiculoApi } from './tipo-vehiculo/tipo-vehiculo.api';
import { TipoVehiculoService } from './tipo-vehiculo/tipo-vehiculo.service';

const API = [

    TipoVehiculoApi
];

const SERVICES = [
    {provide: TipoVehiculoData, useClass: TipoVehiculoService}
];

@NgModule({
    imports: [CommonModule],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
