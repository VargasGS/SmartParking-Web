import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';




import { CommonModule } from '@angular/common';
import { TipoVehiculo } from '@app/models/tipo-vehiculo/tipo-vehiculo';
import { TipoVehiculoService } from 'src/app/services/tipo-vehiculo/tipo-vehiculo.service';
import { VehiculoCampoService } from 'src/app/services/vehiculo-campo/vehiculo-campo.service';

import { VehiculoCampo, VehiculoCampoRequest } from '@app/models/vehiculo-campo/vehiculo-campo';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-vehiculo',
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
    MatTableModule

  ],
  templateUrl: './vehiculo.html',
  styleUrl: './vehiculo.css',
})
export class VehiculoComponent {


  form;

  tipoVehiculoList: TipoVehiculo[] = [];

  VehiculoCampoList: VehiculoCampoRequest[] = [];

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'idVehiculoCampo',
    'matricula',
    'fechaProceso',
    'descripcionTipoVehiculo',
    'montoPrecioColones',
    'montoPrecioDolares',
    'acciones'
  ];



  constructor(private fb: FormBuilder,
    private tipoVehiculoServicio: TipoVehiculoService,
    private vehiculoCampoServicio: VehiculoCampoService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(5)]],
      idTipoVehiculo: ['', Validators.required],
      ley7600: [false]
    });
  }

  ngOnInit(): void {
    this.obtenerTipoVehiculo();
    this.obtenerVehiculoCampo();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerTipoVehiculo() {
    this.tipoVehiculoServicio.obtenerTipoVehiculo().subscribe({
      next: (res) => {

        this.tipoVehiculoList = res ?? [];
        console.log(this.tipoVehiculoList);
        this.cdr.detectChanges();
      }
    });
  }

  obtenerVehiculoCampo() {
    this.vehiculoCampoServicio.obtenerVehiculoCampo().subscribe({
      next: (res) => {

        this.dataSource.data = res ?? [];
        console.log(this.dataSource);
        this.cdr.detectChanges();
      }
    });
  }


  limpiarCampos() {
    this.form.reset();
  }

  guardarVehiculoCampo() {
    if (this.form.invalid) return;

    const vehiculoCampo: VehiculoCampo = {
      idVehiculoCampo: 0,
      idVehiculo: 0,
      idCampo: 0,
      fechaIngreso: new Date(),
      montoTotalColones: 0,
      montoTotalDolares: 0,
      estado: true,

      vehiculo: {
        idVehiculo: 0,
        placa: this.form.value.placa!,
        idTipoVehiculo: Number(this.form.value.idTipoVehiculo),
        tipoVehiculo: {
          idTipoVehiculo: 0,
          tipoVehiculoDescripcion: '',
          precio: {
            IdPrecio: 0,
            PrecioColones: 0,
            PrecioDolares: 0
          }
        }
      },

      campo: {
        idCampo: 0,
        ley7600: this.form.value.ley7600 ?? false,
        cantidadCampos: 0,
        idPiso: 0,
        idTipoCampo: 0,

        piso: {
          idPiso: 0,
          numeroPiso: 0,
          estadoPiso: true
        },

        tipoCampo: {
          idTipoCampo: 0,
          tipoCampoDesc: ''
        }
      }
    };


    this.vehiculoCampoServicio.guardarVehiculoCampo(vehiculoCampo).subscribe({
      next: (res) => {
        console.log(res);
       this.obtenerVehiculoCampo();
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
  actualizarVehiculoCampo(elemet:VehiculoCampoRequest) {

    const vehiculoCampo: VehiculoCampo = {
      idVehiculoCampo: elemet.idVehiculoCampo,
      idVehiculo: 0,
      idCampo: 0,
      fechaIngreso: new Date(),
      montoTotalColones: elemet.montoPrecioColones,
      montoTotalDolares: elemet.montoPrecioDolares,
      estado: true,

      vehiculo: {
        idVehiculo: 0,
        placa: elemet.matricula,
        idTipoVehiculo: Number(this.form.value.idTipoVehiculo),
        tipoVehiculo: {
          idTipoVehiculo: 0,
          tipoVehiculoDescripcion: '',
          precio: {
            IdPrecio: 0,
            PrecioColones: 0,
            PrecioDolares: 0
          }
        }
      },

      campo: {
        idCampo: 0,
        ley7600: this.form.value.ley7600 ?? false,
        cantidadCampos: 0,
        idPiso: 0,
        idTipoCampo: 0,

        piso: {
          idPiso: 0,
          numeroPiso: 0,
          estadoPiso: true
        },

        tipoCampo: {
          idTipoCampo: 0,
          tipoCampoDesc: ''
        }
      }
    };

    console.log(vehiculoCampo);


    this.vehiculoCampoServicio.actualizarVehiculoCampo(vehiculoCampo).subscribe({
      next: (res) => {
        // this.obtenerTipoVehiculo();
        console.log(res);
        this.cdr.detectChanges();

        Swal.fire({
          text: 'Se registró la salida del vehiculo correctamente',
          icon: 'success'
        });

        this.limpiarCampos();
      },
      error: () => {
        Swal.fire({ text: 'Error al registrar', icon: 'error' });
      }
    });

  }

}