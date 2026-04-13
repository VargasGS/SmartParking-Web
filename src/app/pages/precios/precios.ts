import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { TipoVehiculo } from 'src/app/models/tipo-vehiculo/tipo-vehiculo';
import { TipoVehiculoService } from 'src/app/services/tipo-vehiculo/tipo-vehiculo.service';
//import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-precios',
  imports: [  ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule],
  templateUrl: './precios.html',
  styleUrl: './precios.css'
})
export class PreciosComponent implements AfterViewInit {

  form;

  precios: any[] = [
  { tipoVehiculo: 'carro', precioC: 2, precioD: 1000 },
  { tipoVehiculo: 'moto', precioC: 1, precioD: 500 }
];
   editIndex: number | null = null;

 //* displayedColumns: string[] = ['IdPago', 'TipoVehiculo', 'Precio'];

  dataSource = new MatTableDataSource([
    { IdPago: 1, TipoVehiculo: 'Carro', Precio: 1200},
    { IdPago: 2, TipoVehiculo: 'Moto', Precio: 300},
    { IdPago: 3, TipoVehiculo: 'Bicicleta', Precio: 15 },
    { IdPago: 4, TipoVehiculo: 'Bus', Precio: 5000 },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private fb: FormBuilder,
    private tipoVehiculoServicio: TipoVehiculoService
) {


    this.form = this.fb.group({
      tipoVehiculo: ['', Validators.required],
      precioC: ['', [Validators.required, Validators.minLength(5)]],
      precioD: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Métodos CRUD

  guardarTipoVehiculo(){
    var tipoVehiculoPrecio ={
      idTipoVehiculo:this.form.value.tipoVehiculo,
      precioColones:this.form.value.precioC,
      precioDolares:this.form.value.precioD,

    } as unknown as TipoVehiculo

    this.tipoVehiculoServicio.guardarTipoVehiculo(tipoVehiculoPrecio).subscribe(
      {
       next: (res) => {
            Swal.fire({
              title: '',
              text: 'El tipo de vehículo se registró correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

        
          
          },
          error: (e) =>{
            console.error(e)
            Swal.fire({
              title: '',
              text: 'Error al registrar el tipo de vehículo',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
        
          } 
    
        }
      )
      
  }

   InsertTipoVehiculoPrecio() {
    if (this.form.valid) {

      const nuevo = {
        tipoVehiculo: this.form.value.tipoVehiculo,
        precioC: this.form.value.precioC,
        precioD: this.form.value.precioD

      };

      this.precios.push(nuevo);

      this.form.reset();
    }
  }

   DeleteTipoVehiculoPrecio(index: number) {
    this.precios.splice(index, 1);
  }

   UpdateTipoVehiculoPrecio(index: number, precioC:any, precioD:any) {
    const colones = precioC.value;
    const dolares = precioD.value;

  if (!colones || !dolares) return;

  this.precios[index].precioC = colones;
  this.precios[index].precioD = dolares;
  }
}