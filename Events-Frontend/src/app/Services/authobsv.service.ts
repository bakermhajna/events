import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { LoadingService } from './isloading.service';
import { isPlatformBrowser } from '@angular/common';
import { Mainservice } from './main.service';
@Injectable({
    providedIn: 'root',
})
export class AuthServiceObsv {
    private isLogedinSubject = new BehaviorSubject<boolean>(false);
    public isLogedin$: Observable<boolean> = this.isLogedinSubject.asObservable();

    constructor(
        private service: Mainservice,
        private jwtservice: JwtService,
        private router: Router,
        private lodingservice: LoadingService,
        @Inject(PLATFORM_ID) private platformId: Object ,
    ) {
        console.log('AuthService instance created');
        const token = this.get_token();
        this.isLogedinSubject.next(!!token);
    }

    islogedinandroute(): void {
        this.isLogedin$.subscribe((isLoggedIn) => {
            if (!isLoggedIn) {
                this.router.navigate(['']);
            }
        });
    }

    subscribeToEvents(): Observable<String> {
        return new Observable(observer => {
          const eventSource = new EventSource('http://localhost:8080/subscribe');
          eventSource.onmessage = (event) => {
            this.isLogedinSubject.next(event.data);
            observer.next(event.data);
          };
          eventSource.onerror = (error) => {
            observer.error(error);
            eventSource.close();
          };
          return () => eventSource.close();
        });
      }

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

    logout(): void {
        this.isLogedinSubject.next(false); 
        localStorage.clear();
        this.router.navigate(['']);
    }

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