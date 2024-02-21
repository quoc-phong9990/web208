import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http: HttpClient){
    
  }
    loginform = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
        // email: new FormControl('', [Validators.required,Validators.email])
        // phone: new FormControl('', [Validators.required,Validators.pattern('0+[0-9]+')])
    });
    mess = '';  
    router = inject(Router);  
   onSubmit() {
    let u = this.loginform.controls.username.value;
    let p = this.loginform.controls.password.value;

    if (u === 'admin' && p === '123456') {
      this.mess = "Đăng nhập thành công";
      localStorage.setItem('login', 'ok');
      this.router.navigate(['dashboard']);
    } else {
      this.mess = "Sai tên đăng nhập hoặc mật khẩu";
    }

    }
}
