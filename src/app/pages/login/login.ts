import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  error = false;

  constructor(private router: Router){}

  login(){

    if(this.email === 'admin@test.com' && this.password === '1234'){

      localStorage.setItem('session','true');

      this.router.navigate(['/dashboard']);

    }else{
      this.error = true;
    }

  }

}