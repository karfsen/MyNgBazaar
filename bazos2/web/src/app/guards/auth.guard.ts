import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
        if(localStorage.getItem("token")!==null){
            return true;
        }else {
             alert("You must be logged in to have access for this route.")
             return false;
        }
    }
    constructor(){}
}