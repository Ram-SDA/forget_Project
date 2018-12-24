import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, FormBuilder, Validator, Validators, AbstractControl } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
import { APP_BASE_HREF } from '@angular/common';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  public userDetail;

  public MatchPassword(AC: AbstractControl) {
    debugger;
    let password = AC.get('password').value; // to get value in input tag
    let conpassword = AC.get('conpassword').value; // to get value in input tag
    if (password != conpassword) {
      console.log('false');
      AC.get('conpassword').setErrors({ MatchPassword: true })
    } else {
      console.log('true');
      return null
    }
  }

  constructor(private router: Router, private http: HttpClient, user: FormBuilder, @Inject(APP_BASE_HREF) private baseHref: string) {
    this.userDetail = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6)])),
      conpassword: new FormControl(null, Validators.required),
    }, {
        validators: this.MatchPassword // your validation method
      });

  }

  ngOnInit() {
  }

  logUser() {
    debugger;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var token = getParameterByName('auth', url);
    var email = getParameterByName('m', url);
    if(this.userDetail.value.password!=this.userDetail.value.conpassword)
    {
      return false;
    }
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    var body = "&email=" + email + "&token=" + token + "&pwd=" + this.userDetail.value.password;

    this.http.post(this.baseHref + "/api/restpwd", body, options).subscribe((data:any) => {
      debugger;
if(data.message=="case1"){
  alert("Your mail has expired");
}
else if(data.message=="case2"){
  alert("Email does not match");
}
else if(data.message=="successfully"){
  alert("Successfully password reset");
  this.router.navigate(['/home']);
}
    });
  }
}
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}