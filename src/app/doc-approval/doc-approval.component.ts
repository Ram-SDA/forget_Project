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
import notie from 'notie';
@Component({
  selector: 'app-doc-approval',
  templateUrl: './doc-approval.component.html',
  styleUrls: ['./doc-approval.component.css']
})
export class DocApprovalComponent implements OnInit {
 
  videoUrl: SafeResourceUrl;
  sanitization: any;
  galleryOptions: NgxGalleryOptions[];
  LicenseImages: NgxGalleryImage[];
  PassportImages: NgxGalleryImage[];
  UtiliyImages: NgxGalleryImage[];
  aadhaarImages: NgxGalleryImage[];

  constructor(private router: Router, private http: HttpClient,private sanitizer: DomSanitizer,@Inject(APP_BASE_HREF) private baseHref:string) {
    //this.sanitizer=sanitizer;
    var aa=sessionStorage.getItem("auth");
    if(aa!="true")
    {
      window.location.href=" ";
    }
   }
  columns: string[];
  ngOnInit() {
    var uname=sessionStorage.getItem("username");
    debugger
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    var body = "userID=" +uname;
     this.http.post(this.baseHref+"/api/document",body,options).subscribe((data:any) => {
      debugger;
      this.columns = data.dat;
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
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.dat[0].licensefileName);
     // data.dat[0].licensefileName=this.sanitizer.bypassSecurityTrustUrl(data.dat[0].licensefileName);
      //data.dat[0].licensefileName= this.sanitization.bypassSecurityTrustStyle(`url(${data.dat[0].licensefileName})`);
      //this.image = this.sanitization.bypassSecurityTrustStyle(`url(${element.image})`);
      // Calling the DT trigger to manually render the table
      //this.dtTrigger.next();
      });
    // this.http.get("http://localhost:8012/api/document").subscribe((data:any) => {
    //   debugger;
      
     
    // });


    debugger;
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

//   this.galleryImages = [
//   {
//         small: 'assets/images/team-img/team-1.jpg',
//         medium: 'assets/images/team-img/team-1.jpg',
//         big: 'assets/images/team-img/team-1.jpg',
//     },
//     {
       
//       small: 'assets/images/team-img/team-2.jpg',
//       medium: 'assets/images/team-img/team-2.jpg',
//       big: 'assets/images/team-img/team-2.jpg'
//     },
//     {      
//       small: 'assets/images/team-img/team-3.jpg',
//       medium: 'assets/images/team-img/team-3.jpg',
//       big: 'assets/images/team-img/team-3.jpg'
//   },
//   {
//     small: 'assets/images/team-img/team-4.jpg',
//     medium: 'assets/images/team-img/team-4.jpg',
//     big: 'assets/images/team-img/team-4.jpg'
//   }
// ];


  }


  public approve(val,useid)
  {
     debugger;
     var bname=sessionStorage.getItem("username");
     let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    var body = "docID=" +val+"&useID=" +useid+"&bankID=" +bname;
     this.http.post(this.baseHref+"/api/approve",body,options).subscribe((data:any) => {
      debugger;
      this.ngOnInit();
      });
  }

  public reject(rejval,useid)
  {
    var bname=sessionStorage.getItem("username");
     debugger;
     let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    var body = "docID=" +rejval+"&useID=" +useid+"&bankID=" +bname;
     this.http.post(this.baseHref+"/api/reject",body,options).subscribe((data:any) => {
      debugger;
      this.ngOnInit();
      });
  }

 
}
