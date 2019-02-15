import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dataService: ServiceService, private router: Router) { }

  ngOnInit() {
  }





}
