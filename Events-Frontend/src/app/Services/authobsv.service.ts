import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mainservice } from '../main.service';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { LoadingService } from './isloading.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root', // Makes the service available application-wide
})
export class AuthServiceObsv {
    // Observable for login state
    private isLogedinSubject = new BehaviorSubject<boolean>(false);
    public isLogedin$: Observable<boolean> = this.isLogedinSubject.asObservable();

    constructor(
        private service: Mainservice,
        private jwtservice: JwtService,
        private router: Router,
        private firebaseService: FirebaseService,
        private lodingservice: LoadingService,
        @Inject(PLATFORM_ID) private platformId: Object ,
    ) {
        console.log('AuthService instance created');

        // // Initialize login state based on token in localStorage
        const token = this.get_token();
        this.isLogedinSubject.next(!!token);
    }

    // Check login state and navigate if not logged in
    islogedinandroute(): void {
        this.isLogedin$.subscribe((isLoggedIn) => {
            if (!isLoggedIn) {
                this.router.navigate(['']);
            }
        });
    }

    // Log in a user and update state
    login(body?: any): void {
        this.service.login(body).subscribe({
            next: (response) => {
                console.log(response);
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
                console.log('Login request completed');
                this.lodingservice.setfalse();
            },
        });
    }

    // Log out a user and update state
    logout(): void {
        this.isLogedinSubject.next(false); // Update login state
        // this.firebaseService.signout(); // Call Firebase signout method
        localStorage.clear();
        this.router.navigate(['']);
    }

    // Observable for login state
    getIsLoggedIn(): Observable<boolean> {
        return this.isLogedin$;
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
}
