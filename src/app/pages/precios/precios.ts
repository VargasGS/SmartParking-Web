import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormGroup
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { CommonModule } from '@angular/common';

import { Precio, TipoVehiculo } from 'src/app/models/tipo-vehiculo/tipo-vehiculo';
import { TipoVehiculoService } from 'src/app/services/tipo-vehiculo/tipo-vehiculo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-precios',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './precios.html',
  styleUrl: './precios.css'
})
export class PreciosComponent implements OnInit, AfterViewInit {

  form!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private tipoVehiculoServicio: TipoVehiculoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tipoVehiculo: ['', Validators.required],
      precioC: ['', Validators.required],
      precioD: ['', Validators.required],
      vehiculos: this.fb.array([])
    });

    this.obtenerTipoVehiculo();
  }

  ngAfterViewInit() { }

  get vehiculos(): FormArray {
    return this.form.get('vehiculos') as FormArray;
  }

  trackByFn(index: number, item: any): any {
    return item.value?.IdPrecio || index;
  }

  limpiarCampos() {
    this.form.patchValue({
      tipoVehiculo: '',
      precioC: '',
      precioD: ''
    });
  }

  guardarTipoVehiculo() {
    if (this.form.invalid) return;

    const tipoVehiculo: TipoVehiculo = {
      tipoVehiculoDescripcion: this.form.value.tipoVehiculo ?? '',
      idTipoVehiculo: 0,
      precio: {
        IdPrecio: 0,
        PrecioColones: Number(this.form.value.precioC),
        PrecioDolares: Number(this.form.value.precioD),
      }
    };

    this.tipoVehiculoServicio.guardarTipoVehiculo(tipoVehiculo).subscribe({
      next: () => {
        this.obtenerTipoVehiculo();
        this.cdr.detectChanges();

        Swal.fire({
          text: 'Registrado correctamente',
          icon: 'success'
        });

        this.limpiarCampos();
      },
      error: () => {
        Swal.fire({ text: 'Error al registrar', icon: 'error' });
      }
    });
  }

  actualizarPrecio(index: number) {

    const item = this.vehiculos.at(index).value;

    const precio: Precio = {
      IdPrecio: item.IdPrecio,
      PrecioColones: Number(item.PrecioColones),
      PrecioDolares: Number(item.PrecioDolares),
    };

    this.tipoVehiculoServicio.actualizarPrecio([precio]).subscribe({
      next: () => {
        Swal.fire({ text: 'Precio actualizado', icon: 'success' });
      },
      error: () => {
        Swal.fire({ text: 'Error al actualizar', icon: 'error' });
      }
    });
  }

  eliminarTipoVehiculo(index: number, id: number) {

    const tipoVehiculo: TipoVehiculo = {
      tipoVehiculoDescripcion: '',
      idTipoVehiculo: id,
      precio: { IdPrecio: 0, PrecioColones: 0, PrecioDolares: 0 }
    };

    this.tipoVehiculoServicio.eliminarTipoVehiculo(tipoVehiculo).subscribe({
      next: () => {

        this.vehiculos.removeAt(index);
        this.cdr.detectChanges();

        Swal.fire({
          text: 'Eliminado correctamente',
          icon: 'success'
        });
      },
      error: () => {
        Swal.fire({ text: 'Error al eliminar', icon: 'error' });
      }
    });
  }

  obtenerTipoVehiculo() {
    this.tipoVehiculoServicio.obtenerTipoVehiculo().subscribe({
      next: (res) => {

        const array = this.fb.array(
          (res ?? []).map(x =>
            this.fb.group({
              IdPrecio: [x.precio.IdPrecio],
              PrecioColones: [x.precio.PrecioColones],
              PrecioDolares: [x.precio.PrecioDolares],
              tipoVehiculoDescripcion: [x.tipoVehiculoDescripcion],
              idTipoVehiculo: [x.idTipoVehiculo]
            })
          )
        );

        this.form.setControl('vehiculos', array);
        this.cdr.detectChanges();
      }
    });
  }
}