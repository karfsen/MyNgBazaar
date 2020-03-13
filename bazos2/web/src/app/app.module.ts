import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdsComponent } from './ads/ads.component';
import {Routes, RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'
import { MyadsComponent } from './myads/myads.component';
import { NewadComponent } from './newad/newad.component';
import { CommonModule }  from '@angular/common';

const appRoutes:Routes=[
  {path:"home",component:AdsComponent},
  {path:"myads",component:MyadsComponent},
  {path:"",component:AdsComponent},
  {path:"newad",component:NewadComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
