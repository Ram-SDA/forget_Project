import { NgModule, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import{BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import 'hammerjs';
import { NgxGalleryModule } from 'ngx-gallery';
// import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { KycRegisterComponent } from './kyc-register/kyc-register.component';
import { DocApprovalComponent } from './doc-approval/doc-approval.component';
import { KycSearchComponent } from './kyc-search/kyc-search.component';
import { APP_BASE_HREF,PlatformLocation,HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { NavbarService } from './navbar/navbar.service';


const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'kycregister',
    component: KycRegisterComponent
  },
  {
    path: 'approval',
    component: DocApprovalComponent
  },
  {
    path: 'kycsearch',
    component: KycSearchComponent
  },
  {
    path: 'forgetpwd',
    component: ForgetPasswordComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    KycRegisterComponent,
    DocApprovalComponent,
    KycSearchComponent,
    ForgetPasswordComponent,
   // NavbarComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes,{useHash:true}),
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
     HttpModule,
     HttpClientModule,
     ToastrModule.forRoot( {
      timeOut: 1000000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      closeButton:true,
      progressBar:true,
      tapToDismiss:false,
    }),
     NgxGalleryModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: 'http://35.200.198.199:6012'}],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
