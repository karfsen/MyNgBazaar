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
  
  login(username,pasword) {
    return this.http.post("http://localhost:2000/myads",{"username":username,"password":pasword},{headers:{"Content-Type": "application/json"}});
  }
}
