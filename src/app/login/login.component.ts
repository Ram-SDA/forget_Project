
import { HttpModule } from '@angular/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validator, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import {APP_BASE_HREF} from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginDetail;
  public forgetlogin;
  msg:string;
  errmsg:boolean;
  logn:boolean;
  forgt:boolean;
  constructor(private router: Router, private http: HttpClient, @Inject(APP_BASE_HREF) private baseHref:string ) { 
    sessionStorage.setItem("auth", "false");
    this.loginDetail = new FormGroup({
      emai: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required),

    });

    this.forgetlogin = new FormGroup({
      forgemai: new FormControl(null, Validators.required)
    });

    this.errmsg=false;
    this.logn=true;
  }

  ngOnInit() {
  }

  forgetUser()
  {
   debugger;    
   let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
   var body = "email=" + this.forgetlogin.value.forgemai;
   this.http.post(this.baseHref+"/api/forget", body, options).subscribe((data: any) => {
       debugger;      
       if (data.message == "successfully") {
        alert("Successfully Sent mail");
        window.location.reload();
       }
     else if(data.message=="case1")
 {
   alert("Email not vaild");
 }
     });
  }


  forgetpassword()
  {
   debugger;
   this.forgetlogin = new FormGroup({
    forgemai: new FormControl(null, Validators.required)
  });
   this.logn=false;
   this.forgt=true;
  }

  forgetback()
  {
    this.logn=true;
   this.forgt=false;
  }

  
  public logUser()
{
  this.errmsg=false;
  if (this.loginDetail.value.emai == null) {

    return false;
  }
  else if (this.loginDetail.value.pass == null) {
    alert(" Password field is required");
    return false;
  }

  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  var body = "email=" + this.loginDetail.value.emai + "&password=" + this.loginDetail.value.pass;
  this.http.post(this.baseHref+"/api/bankauthenticate", body, options).subscribe((data: any) => {
      debugger;
      sessionStorage.setItem("username", "DART Bank");
      sessionStorage.setItem("auth", "true"); 
      if (data.message == "successfully authenticated") {
        this.router.navigate(['/home']);
      }
      else if (data.message == "Email and password does not match") {
        this.errmsg=true;
        this.msg="Email and password does not match";
        // alert("Email and password does not match");
        // notie.alert({ type: 'warning', text: 'Email and password does not match...' })
        // this.slimLoadingBarService.complete();
      }
      else if (data.message == "Email does not exits") {
        // notie.alert({ type: 3, text: 'Email does not exits.'})
        // this.slimLoadingBarService.complete();
        // alert("Email does not exits.");
        this.errmsg=true;
        this.msg="Email does not exits.";
      }

    });
}



}
