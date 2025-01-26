import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from './isloading.service';
import { isPlatformBrowser } from '@angular/common';
import { Mainservice } from './main.service';
import { JwtService } from './jwt.service';
import { Customer } from '../models/customer';
@Injectable({
    providedIn: 'root',
})
export class AuthServiceObsv {
    private isLogedinSubject = new BehaviorSubject<boolean>(false);
    public isLogedin$: Observable<boolean> = this.isLogedinSubject.asObservable();

    constructor(
        private service: Mainservice,
        private router: Router,
        private lodingservice: LoadingService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private jwtservice: JwtService
    ) {
        const token = this.jwtservice.get_token();
        if (!this.jwtservice.isTokenExpired(token)) {
            this.isLogedinSubject.next(true);
        }
    }

    login(body?: any): void {
        this.service.login(body).subscribe({
            next: (response) => {
                localStorage.setItem('token', response.body?.token || '');
                localStorage.setItem('user', JSON.stringify(response.body?.customer));
                this.isLogedinSubject.next(true); // Update login state
                this.router.navigate(['/home']);
            },
            error: (err) => {
                console.log('Login error:', err);
                this.lodingservice.setfalse();
            },
            complete: () => {
                this.lodingservice.setfalse();
            },
        });
    }

    logout(): void {
        this.isLogedinSubject.next(false); 
        localStorage.clear();
        this.router.navigate(['']);
    }

    getIsLoggedIn(): Observable<boolean> {
        return this.isLogedin$;
    }

    getIsLoggedInSubject(): BehaviorSubject<boolean> {
        return this.isLogedinSubject;
    }

    get_token() {
        let token: string | null = null;

        if (isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem('token');
        } else {
            console.warn('Not running in a browser environment!');
        }
        return token
    }

    getUser():Customer{
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    getUserId():string{
        return this.getUser().id;
    }
}
