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
  FormGroup
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

import { PisoService } from 'src/app/services/pisos/pisos.service';

import Swal from 'sweetalert2';
import { Campo, TipoCampo } from '@app/models/pisos/piso';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-pisos',
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
    MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './pisos.html',
  styleUrl: './pisos.css'
})
export class PisosComponent implements OnInit, AfterViewInit {

  form!: FormGroup;
  formCampo!: FormGroup;

  tipoCamposList: TipoCampo[] = [];

  CamposList: Campo[] = [];

  displayedColumns: string[] = [
    'idCampo',
    'numeroPiso',
    'cantidadCampos',
    'tipoCampo',
    'ley7600'
  ];

  dataSource: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private PisoServicio: PisoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      tipoCampoDesc: ['', Validators.required]
    });


    this.formCampo = this.fb.group({
      idTipoCampo: ['', Validators.required],
      ley7600: [false],
      cantidadCampos: ['', Validators.required],
      numeroPiso: ['', Validators.required]
    });

    this.obtenerTipoCampo();
    this.obtenerCampo();
  }

  ngAfterViewInit() { }

  trackByFn(index: number, item: TipoCampo): any {
    return item.idTipoCampo;
  }

  limpiarCampos() {
    this.form.reset();
  }


  guardarTipoCampo() {

    if (this.form.invalid) return;

    const tipoCampo: TipoCampo = {
      idTipoCampo: 0,
      tipoCampoDesc: this.form.value.tipoCampoDesc
    };

    this.PisoServicio.guardarTipoCampo(tipoCampo).subscribe({
      next: () => {

        this.obtenerTipoCampo();
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

  obtenerTipoCampo() {
    this.PisoServicio.obtenerTipoCampo().subscribe({
      next: (res) => {

        this.tipoCamposList = res ?? [];
        this.cdr.detectChanges();
      }
    });
  }


  guardarCampo() {

    if (this.formCampo.invalid) return;

    const campo: Campo = {
      idCampo: 0,
      ley7600: this.formCampo.value.ley7600,
      idTipoCampo: Number(this.formCampo.value.idTipoCampo),
      idPiso: 0,
      cantidadCampos: this.formCampo.value.cantidadCampos,

      piso: {
        idPiso: 0,
        numeroPiso: this.formCampo.value.numeroPiso,
        estadoPiso: true
      },

      tipoCampo: {
        idTipoCampo: Number(this.formCampo.value.idTipoCampo),
        tipoCampoDesc: ''
      }
    };

    console.log(campo);

    this.PisoServicio.guardarCampo([campo]).subscribe({
      next: () => {

        this.formCampo.reset({
          ley7600: false
        });

        this.cdr.detectChanges();

        Swal.fire({
          text: 'Registrado correctamente',
          icon: 'success'
        });

      },
      error: () => {
        Swal.fire({ text: 'Error al registrar', icon: 'error' });
      }
    });

  }

  obtenerCampo() {
    this.PisoServicio.obtenerCampo().subscribe({
      next: (res) => {

        this.CamposList = res ?? [];

        this.dataSource = this.CamposList;

        this.cdr.detectChanges();

        console.log(this.CamposList);
      }
    });
  }

}