import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class JwtService{

  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

    isTokenExpired(token: string|null): boolean {
        if (!token) return true; 
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expirationDate = payload.exp * 1000; 
          return Date.now() > expirationDate;
        } catch (error) {
          console.error('Invalid token format:', error);
          return true; 
        }
      }

      get_token(){
        let token: string | null = null;
        if (isPlatformBrowser(this.platformId)) {
          token = localStorage.getItem('token');
        } else {
          console.warn('Not running in a browser environment!');
        }
        return token
      }
}