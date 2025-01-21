import { Injectable } from '@angular/core';
import { 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router 
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthServiceObsv } from '../Services/authobsv.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard  {
    constructor(
        private authService: AuthServiceObsv,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.getIsLoggedIn().pipe(
            take(1),
            map(isLoggedIn => {
                if (!isLoggedIn) {
                    console.log('Access denied - Not logged in');
                    this.router.navigate(['']);
                    return false;
                }
                return true;
            })
        );
    }
}