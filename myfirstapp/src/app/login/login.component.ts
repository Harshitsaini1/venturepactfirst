import { Component, OnInit, } from '@angular/core';

import { DataService } from '../service/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataservice: DataService, private router: Router) {
    console.log('Auth :' + this.dataservice.isLogged);
  }

  ngOnInit(): void {
  }

  email = "";
  password = "";
  logProcessMessage: string = "";
  showMessage: boolean = false;

  loginUser() {
    this.showMessage = true,
      this.logProcessMessage = 'Logging User',

      this.dataservice.loginUser({
        email: this.email,
        password: this.password,

      })
        .subscribe({
          next: (data: any) => {
            console.log(data);
            console.log(data.body.jwt);
            console.log(" data received login");
            this.dataservice.JWT_TOKEN = data.body.jwt;



            localStorage.setItem('auth', JSON.stringify(data.body.jwt));
            console.log('Setting auth key in Local storage');
            // console.log(localStorage.getItem('auth'));
            this.dataservice.userStatus.emit(true);
            this.router.navigate(['']);
          },
          error: (err) => {
            this.logProcessMessage = 'Error Logging user !';
            console.log('error occured in Logging in User');
            console.log(err);
            if (err.status === 401 || err.status === 404)
              this.logProcessMessage = 'Authentication failed, try again !';
          },
        });
  }

}