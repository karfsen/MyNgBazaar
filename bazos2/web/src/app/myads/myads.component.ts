import { Component, OnInit } from '@angular/core';
import { ServerServiceService } from '../services/server-service.service';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.css']
})
export class MyadsComponent implements OnInit {
  ads;
  process="Loading...";
  loading=true;
  constructor(public service:ServerServiceService) { }

  ngOnInit(): void {
    this.service.getMyAds().subscribe(result=>{
      this.ads=result;
      this.loading=false;
    },error=>{
      this.process=error.message;
      if(error.status===401) {
        localStorage.removeItem("token");
        window.location.href="localhost:4200"
      }
    });
  }

}
