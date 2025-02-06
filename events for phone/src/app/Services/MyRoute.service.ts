import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyRouteService {
  private navigationSubject = new Subject<string>();

  constructor(private router: Router) {
    // Listen to router events and emit current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: any) => event.urlAfterRedirects)
    ).subscribe(url => {
      this.navigationSubject.next(url);
    });
  }


  // Navigate to a route and notify subscribers
  navigateTo(url: string | string[]): void {
    this.router.navigate(Array.isArray(url) ? url : [url]);
  }

  // Get current route as observable
  getCurrentRoute(): Observable<string> {
    return this.navigationSubject.asObservable();
  }

  // Get current route path directly
  getCurrentPath(): string {
    return this.router.url;
  }
}
