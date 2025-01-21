import { Component, OnInit, signal } from '@angular/core';
import { MatselectComponent } from "../matselect/matselect.component";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router ,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatselectComponent,MatButtonModule,MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  currentRoute: string = ''; // Store the current route

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects; 
      });
  }
  

  navigate()
  {
   if (this.currentRoute.includes('/home')) {
      this.router.navigate(['/addevent']);
    } else if (this.currentRoute.includes('/group')) {
      this.router.navigate(['/addgroup']);//to addgroup
    } 
  }

}
