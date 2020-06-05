import { Component, OnInit } from '@angular/core';
import { ServerServiceService } from '../services/server-service.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-newad',
  templateUrl: './newad.component.html',
  styleUrls: ['./newad.component.css']
})
export class NewadComponent implements OnInit {
  disabledd:boolean=true;
  error:any;
  newAdForm:FormGroup;
  constructor(public service:ServerServiceService) { }

  ngOnInit(): void {
    this.newAdForm=new FormGroup({
      "titleController":new FormControl("",[Validators.required]),
      "descriptionController":new FormControl("",[Validators.required,Validators.maxLength(50)]),
      "sellerNameController":new FormControl("",[Validators.required]),
      "priceController":new FormControl("",[Validators.required]),
      "phoneNumberController":new FormControl("",[Validators.required]),
      "emailController":new FormControl("",[Validators.required,Validators.email])
    });
    this.newAdForm.statusChanges.subscribe(status=>{
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

  }
}
