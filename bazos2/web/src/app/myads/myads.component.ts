import { Component, OnInit } from '@angular/core';
import { Ad } from '../entity/ad.model';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.css']
})
export class MyadsComponent implements OnInit {
  ads :Ad[]=[
    new Ad(1,"HyperX Cloud 2","Im selling these headphones",new Date("2020-02-08"),"Martin Krendželák",78,"0911967070","bla@bla.sk"),
    new Ad(1,"DELL INSPIRON 15","Im selling this gaming laptop",new Date("2020-02-08"),"Martin Krendželák",821,"0911967070","bla@bla.skap"),
    new Ad(1,"SAMSUNG GALAXY S20","Im selling this mobile phone",new Date("2019-08-11"),"Martin Krendželák",350,"0911967070","bla@blabla.sk")
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
