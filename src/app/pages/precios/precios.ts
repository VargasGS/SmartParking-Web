import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';


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
    MatTableModule],
  templateUrl: './precios.html',
  styleUrl: './precios.css',
})
export class PreciosComponent {

  
   form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tipoVehiculo: ['', Validators.required],
      precio: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}
