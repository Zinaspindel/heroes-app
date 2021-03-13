import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  error: any = null;
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    
    const username = form.value.username;
    const email = form.value.email;
    const password:string = form.value.password;
    
    let authObs:Observable<AuthResponseData>;
    
    if(this.isLogin){
      authObs = this.authService.login(email,password);
    } else {
      authObs = this.authService.signup(username,email,password);
    }
    authObs.subscribe(
      resData => {
        this.error = null;
        this.router.navigate(['/profile']);
      },
      errorMsg => {
        this.error = errorMsg;
      }
    )
    form.reset();
  }
  changeAuthMode(f:NgForm){
    this.error = null;
    f.reset()
    this.isLogin = !this.isLogin;
  }

}
