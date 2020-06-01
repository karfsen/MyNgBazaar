import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {

  constructor(private http:HttpClient) { 

  }

  getAds(){
    return this.http.get("http://localhost:2000/getads");
  }

  getMyAds(){
    return this.http.post("http://localhost:2000/myads",localStorage.getItem("token"),{headers:{"Content-Type": "application/json"}});
  }
  
  login(username,password) {
    return this.http.post("http://localhost:2000/login",{"username":username,"password":password},{headers:{"Content-Type": "application/json"}});
  }

  logout(){
    return this.http.post("http://localhost:2000/logout",JSON.parse(localStorage.getItem("token")),{headers:{"Content-Type": "application/json"}});
  }

  register(username,password){
    return this.http.post("http://localhost:2000/register",{"username":username,"password":password},{headers:{"Content-Type": "application/json"}});
  }


}
