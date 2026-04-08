import { Component } from '@angular/core';
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
  styleUrl: './precios.css',
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

  constructor(private fb: FormBuilder) {
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