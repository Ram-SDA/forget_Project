import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { 
    var aa=sessionStorage.getItem("auth");
    if(aa!="true")
    {
      window.location.href=" ";
    }
  }

  ngOnInit() {
  }

  rigistercus()
  {
    this.router.navigate(['/kycregister']);
  }

  approval()
  {
    this.router.navigate(['/approval']);
  }

  search()
  {
    this.router.navigate(['/kycsearch']);
  }
}
