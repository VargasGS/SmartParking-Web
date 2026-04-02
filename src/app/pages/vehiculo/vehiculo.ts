import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehiculo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './vehiculo.html',
  styleUrl: './vehiculo.css',
})
export class VehiculoComponent {


   form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(5)]],
      tipoVehiculo: ['', Validators.required],
      ley7600: [false]
    });
  }



}