import { Component, OnInit,Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validator, Validators, AbstractControl } from '@angular/forms';
import 'hammerjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
// @Pipe({
//   name: 'searchfilter'
//  })
//  @Injectable()
// export class SearchFilterPipe implements PipeTransform {
//  transform(items: any[], field: string, value: string): any[] {
//    debugger;
//    if (!items) return [];
//    return items.filter(it => it[field] == value);
//  }
// }
@Component({
  selector: 'app-kyc-search',
  templateUrl: './kyc-search.component.html',
  styleUrls: ['./kyc-search.component.css']
})
export class KycSearchComponent implements OnInit {
  flag: boolean;
  videoUrl: SafeResourceUrl;
  sanitization: any;
  galleryOptions: NgxGalleryOptions[];
  LicenseImages: NgxGalleryImage[];
  PassportImages: NgxGalleryImage[];
  UtiliyImages: NgxGalleryImage[];
  aadhaarImages: NgxGalleryImage[];
  columns: string[];
butt:boolean;
penAppro:boolean;
buthide:boolean;

li:string;
pa:string;
ulti:string;
aad:string;

  constructor(private router: Router, private http: HttpClient,private sanitizer: DomSanitizer,@Inject(APP_BASE_HREF) private baseHref:string) {
    var aa=sessionStorage.getItem("auth");
    if(aa!="true")
    {
      window.location.href=" ";
    }
    
    this.flag=false;
    this.penAppro=false;
    this.buthide=true;
  }

  ngOnInit() {
    this.galleryOptions = [
      {
          width: '600px',
          height: '600px',
          thumbnails:false,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];
  }


  public request(userval,bankval,docid)
  {
    if(confirm('Do you want to request the document?')){
     debugger;
     var currbank=sessionStorage.getItem("username");
     let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
     var body = "userid=" + userval + "&bank=" + currbank+ "&docid=" + docid;
     this.http.post(this.baseHref+"/api/request",body,options).subscribe((data:any) => {
      debugger;
      this.subSearch(data.dat);
      if(data.message=="already"){
        alert("You already send Request ");
      }
      else{
        alert("Your Request sent for customer approval")
      this.ngOnInit();
      }
      });
    }
    else
    {

    }
  }



public subSearch(val)
{
  debugger;
  this.penAppro=false;
  this.columns=[];
  this.flag=false; 
  this.li="";
  this.pa="";
  this.ulti="";
  this.aad="";
  this.butt=true;
  this.buthide=true;
  debugger
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  var body = "userID=" +val;
   this.http.post(this.baseHref+"/api/requestbank",body,options).subscribe((data:any) => {
    debugger;
    
    var uname=sessionStorage.getItem("username");
    var textArray2 = data.dat[0].bankname.split(/[,.]+/); 
//var flag="false";
for(var i=0;i<textArray2.length;i++)
{
  debugger;
   if(textArray2[i]==uname)
   {
  this.flag=true; 
  }
}

    
if(this.flag==true)
{
  this.columns = data.dat;
  this.butt=false;
  this.buthide=false;
  this.LicenseImages = [
    {
          small: data.dat[0].licensefileName,
          medium: data.dat[0].licensefileName,
          big: data.dat[0].licensefileName,
      }];
      this.PassportImages = [
        {
              small: data.dat[0].passportfileName,
              medium: data.dat[0].passportfileName,
              big: data.dat[0].passportfileName,
          }];
          this.UtiliyImages = [
            {
                  small: data.dat[0].utiliybillfileName,
                  medium: data.dat[0].utiliybillfileName,
                  big: data.dat[0].utiliybillfileName,
              }];
              this.aadhaarImages = [
                {
                      small: data.dat[0].aadhaarfileName,
                      medium: data.dat[0].aadhaarfileName,
                      big: data.dat[0].aadhaarfileName,
                  }];
                  this.li=data.dat[0].Id+"-license";
                  this.pa=data.dat[0].Id+"-passport";
                  this.ulti=data.dat[0].Id+"-utiliy bill";
                  this.aad=data.dat[0].Id+"-aadhaar";

}
else
{
  var chk=this.requestchk(data.dat[0].userId, sessionStorage.getItem("username")) ;
debugger;
  data.dat[0].aadhar=" ";
  data.dat[0].dob=" ";
  // data.dat[0].status=" ";
  this.columns = data.dat;
  this.butt=true;
 // this.li="-";
}
    


    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.dat[0].licensefileName);
   // data.dat[0].licensefileName=this.sanitizer.bypassSecurityTrustUrl(data.dat[0].licensefileName);
    //data.dat[0].licensefileName= this.sanitization.bypassSecurityTrustStyle(`url(${data.dat[0].licensefileName})`);
    //this.image = this.sanitization.bypassSecurityTrustStyle(`url(${element.image})`);
    // Calling the DT trigger to manually render the table
    //this.dtTrigger.next();





   
    });
}
public requestchk(userval,bankval)
{
  
   debugger;
   let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
   var body = "userid=" + userval + "&bank=" + bankval;
   this.http.post(this.baseHref+"/api/requestchk",body,options).subscribe((data:any) => {
    debugger;
    if(data.message=="already"){
      //alert("You already send Request ");
      this.butt=false;
      this.penAppro=true;
    }
    else{
      //alert("Your Request Succesfully send  ")
      this.butt=true;
     
   // this.ngOnInit();
    }
    });
}

}
