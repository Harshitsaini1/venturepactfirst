import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


import { DataService } from '../service/data.service';


import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [DataService]
})
export class SignupComponent implements OnInit {
 

  constructor(private datservice: DataService, private router:Router) { }

  
  ngOnInit(): void {
    
  }
  submitted= false;
  showMessage=false;
  disabledregister=false;
  regProcessMessage:string='';
  out:any='default';

  check(){
    this.datservice.checkCon()
      .subscribe(data=>{
        console.log(data);
        this.out=data;
        console.log(this.out.success)
        this.out=this.out.response
      })
  }
  

  firstname = "";
  userName = "";
  email = "";
  password = "";
  confirmpassword = "";
 


  onsubmit(form: NgForm) {
    console.log(form);
  }

 

  registerUser() {
    this.showMessage=true;
    this.submitted =true,
    this.regProcessMessage="Registering User"
    console.log('Register user ng called')
    this.datservice.registerUser({
      
      firstname: this.firstname,
      userName: this.userName,
      email: this.email,
      password: this.password,
      confirmpassword: this.confirmpassword,
    

    }).subscribe((data)=>{
      console.log(data);
      this.regProcessMessage="Registered Successfully, Redirect login :-)";

      this.router.navigate(['/login']);
      
    })  
  }

}

