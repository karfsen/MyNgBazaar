import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdsComponent } from './ads/ads.component';
import {Routes, RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'
import { MyadsComponent } from './myads/myads.component';
import { NewadComponent } from './newad/newad.component';
import { CommonModule }  from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import {AuthGuard} from "./guards/auth.guard";

const appRoutes:Routes=[
  {path:"home",component:AdsComponent},
  {path:"myads",component:MyadsComponent,canActivate:[AuthGuard]},
  {path:"",component:AdsComponent},
  {path:"newad",component:NewadComponent,canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdsComponent,
    LoginComponent,
    SignupComponent,
    MyadsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
