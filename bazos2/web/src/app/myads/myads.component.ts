import { Component, OnInit } from '@angular/core';
import { ServerServiceService } from '../services/server-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ad } from '../entity/ad.model';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.css']
})
export class MyadsComponent implements OnInit {
  disabledd=true;
  ads:any;
  inputs=false;
  process="Loading...";
  loading=true;
  editAdForm:FormGroup;
  constructor(public service:ServerServiceService) { }

  ngOnInit(): void {
    this.service.getMyAds().subscribe(result=>{
      this.ads=result;
      this.loading=false;
    },error=>{
      this.process=error.message;
      if(error.status===401|| error.status===500) {
        localStorage.removeItem("token");
        alert(error.error);
        window.location.href="http://localhost:4200/login"
      }
    });
    this.editAdForm=new FormGroup({
      "titleController":new FormControl("",[Validators.required]),
      "descriptionController":new FormControl("",[Validators.required,Validators.maxLength(100)]),
      "priceController":new FormControl("",[Validators.required])
    });
    this.editAdForm.statusChanges.subscribe(status=>{
      if(status==="VALID"){
        this.disabledd=false;
      }else if(status==="INVALID"){
        this.disabledd=true;
      }else if(status==="PENDING"){
        this.disabledd=true;     
      }
    });
  }

  deletead(id){
    console.log(id);
    this.service.deletead(id).subscribe(result=>{
      alert("Delete successful.");
      this.ngOnInit();
    },error=>{
      this.process=error.error;
    })
  }

  submit(id){
    let token=JSON.parse(localStorage.getItem("token"));
    this.service.editad({
      "token": token.token,
      "_id":id,
      "title":this.editAdForm.value.titleController,
      "text":this.editAdForm.value.descriptionController,
      "price":this.editAdForm.value.priceController,
    }).subscribe(result=>{
      alert("Successfully edited ad!");
      this.ngOnInit();
      this.inputs=false;
    },error=>{
      alert(error.error);
    })
  }
}
