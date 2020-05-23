import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  hasToken=false;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("token")!==null){
      this.hasToken=true;
    }else{
      this.hasToken=false;
    }
  }

  logout(){
    localStorage.removeItem("token");
  }

}
