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

  listaTipoVehiculo: TipoVehiculo[] = [];


   editIndex: number | null = null;

 //* displayedColumns: string[] = ['IdPago', 'TipoVehiculo', 'Precio'];

  
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
    
  }

  ngOnInit(): void {
  this.obtenerTipoVehiculo();
}

  //Métodos CRUD

   limpiarCampos(){
    this.form.reset();
  }

  guardarTipoVehiculo(){

   const tipoVehiculo: TipoVehiculo = {
    tipoVehiculoDescripcion: this.form.value.tipoVehiculo ?? '',
    idTipoVehiculo: 0,
    precio: {
      IdPrecio: 0,
      PrecioColones: Number(this.form.value.precioC),
      PrecioDolares: Number(this.form.value.precioD),
    }
  };

    this.tipoVehiculoServicio.guardarTipoVehiculo(tipoVehiculo).subscribe(
      {
       next: (res) => {
        
       this.listaTipoVehiculo = [
       ...this.listaTipoVehiculo,
             tipoVehiculo
        ];

      this.limpiarCampos();
      this.obtenerTipoVehiculo();


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

  obtenerTipoVehiculo() {
  this.tipoVehiculoServicio.obtenerTipoVehiculo().subscribe({
    next: (res) => {
     this.listaTipoVehiculo = [...res];
      console.log('Lista de tipos de vehículo:', res);
    },
    error: (e) => {
      console.error(e);
      Swal.fire({
        title: '',
        text: 'Error al obtener los tipos de vehículo',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}

   InsertTipoVehiculoPrecio() {
    if (this.form.valid) {

      const nuevo = {
        tipoVehiculo: this.form.value.tipoVehiculo,
        precioC: this.form.value.precioC,
        precioD: this.form.value.precioD

      };

      //this.precios.push(nuevo);

      this.form.reset();
    }
  }

   DeleteTipoVehiculoPrecio(index: number) {
    //this.precios.splice(index, 1);
  }

   UpdateTipoVehiculoPrecio(index: number, precioC:any, precioD:any) {
    const colones = precioC.value;
    const dolares = precioD.value;

  if (!colones || !dolares) return;

  //this.precios[index].precioC = colones;
  //this.precios[index].precioD = dolares;
  }

 
}