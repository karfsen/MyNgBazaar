import { Component, OnInit } from '@angular/core';
import { ServerServiceService } from '../services/server-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  hasToken=false;
  login=JSON.parse(localStorage.getItem("token")).username;
  constructor(public service:ServerServiceService) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")!==null){
      this.hasToken=true;
    }else{
      this.hasToken=false;
    }
  }

  logout(){
    this.service.logout().subscribe(result=>{
      console.log(result);
      localStorage.removeItem("token");
      alert("Logout successful.");
      window.location.href ="http://localhost:4200/";
    },error=>{
      if(error.status===401) {
        localStorage.removeItem("token");
        window.location.href="http://localhost:4200/"
      }
    });
  }

}
