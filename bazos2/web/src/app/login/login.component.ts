import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerServiceService } from '../services/server-service.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  disabledd:boolean=true;
  error:any;
  loginForm:FormGroup;
  constructor(public service:ServerServiceService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      "usernameController":new FormControl("",[Validators.required,Validators.minLength(3)]),
      "passwordController":new FormControl("",[Validators.required,Validators.minLength(5)]),
    });
    this.loginForm.statusChanges.subscribe(status=>{
      if(status==="VALID"){
        this.disabledd=false;
      }else if(status==="INVALID"){
        this.disabledd=true;
      }else if(status==="PENDING"){
        this.disabledd=true;     
      }
    });
  }

  submit(){
    console.log(this.loginForm);
    this.service.login(this.loginForm.value.usernameController,this.loginForm.value.passwordController).subscribe(result=>{
      console.log(result);
      localStorage.setItem("token",JSON.stringify(result));
      window.location.href ="http://localhost:4200/";
    },error=>{
      console.log(error);
    });
  }
}
