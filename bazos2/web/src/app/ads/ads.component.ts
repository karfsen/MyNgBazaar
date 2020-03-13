import { Component, OnInit } from '@angular/core';
import { Ad } from '../entity/ad.model';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  ads :Ad[]=[
    new Ad(1,"HyperX Cloud 2","Im selling these headphones",new Date("2020-02-08"),"Martin Krendželák",60,"0911967070","bla@bla.sk"),
    new Ad(1,"DELL INSPIRON 15","Im selling this gaming laptop",new Date("2020-02-08"),"Martin Krendželák",580,"0911967070","bla@bla.skap"),
    new Ad(1,"SAMSUNG GALAXY S20","Im selling this mobile phone",new Date("2019-08-11"),"Martin Krendželák",800,"0911967070","bla@blabla.sk")
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
