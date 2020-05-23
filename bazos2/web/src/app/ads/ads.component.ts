import { Component, OnInit } from '@angular/core';
import { Ad } from '../entity/ad.model';
import { ServerServiceService } from '../services/server-service.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  loading=true;
  process="Loading...";
  ads :Ad[];
  constructor(public service:ServerServiceService) { }

  ngOnInit(): void {
      this.service.getAds().subscribe((result:Array<Ad>)=>{
        console.log(result);
        this.ads=result;
        this.loading=false;
      },error=>{this.process=error.message}
      );
  }

}
