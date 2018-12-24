
import { HttpModule } from '@angular/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validator, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import {APP_BASE_HREF} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-kyc-register',
  templateUrl: './kyc-register.component.html',
  styleUrls: ['./kyc-register.component.css']
})
export class KycRegisterComponent implements OnInit {

  public loginDetail;
 
  
  constructor(private router: Router, private http: HttpClient,private toastr: ToastrService,@Inject(APP_BASE_HREF) private baseHref:string) { 
   
    var aa=sessionStorage.getItem("auth");
    if(aa!="true")
    {
      window.location.href=" ";
    }
   
    this.loginDetail = new FormGroup({
      uname: new FormControl(null, Validators.required),
      emai: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      aatha: new FormControl(null, Validators.required)
    });
    
  }

  ngOnInit() {
    this.loginDetail = new FormGroup({
      uname: new FormControl(null, Validators.required),
      emai: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      aatha: new FormControl(null, Validators.required)
    });
  }
  public completed(i)
  {
    this.toastr.clear();
  }
  public logUser()
{
 
let newDate = new Date(this.loginDetail.value.dob);
let dobstring=newDate.toLocaleDateString();
 debugger;
  if (this.loginDetail.value.emai == null) {

    return false;
  }  
  var bankname=sessionStorage.getItem("username");
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  var body = "username=" + this.loginDetail.value.uname + "&email=" + this.loginDetail.value.emai+ "&dateofbirth=" + dobstring+ "&aathar=" + this.loginDetail.value.aatha+ "&bankname=" + bankname;
  this.http.post(this.baseHref+"/api/register", body, options).subscribe((data: any) => {
      debugger;
      if (data.message == "user saved sucessfully") {
        this.toastr.info('KYC Initiated!', 'KYC No -'+data.dat["LAST_INSERT_ID()"]);
        this.ngOnInit();
       //alert("user saved sucessfully");
      // this.router.navigate(['/home']);
      }
      else{
        //alert("user already Exist");
        this.toastr.info(' ', 'User Already Exist !');
      }
      

    });
}
}
