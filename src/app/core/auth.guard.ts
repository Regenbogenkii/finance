import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ServiceService } from '../service.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canAccess = false
  constructor(private router: Router, private dataService: ServiceService) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    this.canAccess = await this.dataService.onCheckAuthState()
    if (this.canAccess) return true
    else this.router.navigate(['/login'])
  }
}
