import { Component, OnInit } from '@angular/core';
import { ServerServiceService } from '../services/server-service.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  disabledd:boolean=true;
  error:any;
  match=false;
  signupForm:FormGroup;
  constructor(public service:ServerServiceService) { }

  ngOnInit(): void {
    this.signupForm=new FormGroup({
      "usernameController":new FormControl("",[Validators.required,Validators.minLength(3)]),
      "passwordController":new FormControl("",[Validators.required,Validators.minLength(5)]),
      "passwordController2":new FormControl("",[Validators.required,Validators.minLength(5)])
    });
    this.signupForm.statusChanges.subscribe(status=>{
      if(status==="VALID"){
        this.disabledd=false;
      }else if(status==="INVALID"){
        this.disabledd=true;
      }else if(status==="PENDING"){
        this.disabledd=true;     
      }
    });
  }
  
  myHandler(){
    //console.log(this.signupForm);
    if(this.signupForm.value.passwordController===this.signupForm.value.passwordController2){
      this.match=true;
    }else{
      this.match=false;
    }
  }
  submit(){
    console.log(this.signupForm);
    this.service.register(this.signupForm.value.usernameController,this.signupForm.value.passwordController).subscribe(result=>{
      console.log(result);
      window.location.href="http://localhost:4200/login"
    },error=>{
      console.log(error);
      alert(error.error);
    });
  }

}
