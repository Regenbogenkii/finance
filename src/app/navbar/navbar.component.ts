import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dataService: ServiceService, private router: Router) { }


  ngOnInit() {
    this.myNavbar()
  }


  myNavbar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


  
  onSignOut() {
    console.log("sign out");
    
   this.dataService.onSignOut().then(res=>{
    console.log("sign out res");
      this.router.navigate(['/login'])
    })
  }

}
