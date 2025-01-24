import { Component, OnInit, signal } from '@angular/core';
import { MatselectComponent } from "../matselect/matselect.component";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router ,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MyRouteService } from '../../Services/MyRoute.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatselectComponent,MatButtonModule,MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  currentRoute: string = ''; // Store the current route
  groupId: string|null=null;
  
  constructor(private router: Router,private myRouteService: MyRouteService) {}
  
  ngOnInit(): void {
    // Subscribe to route changes using MyRouteService
    this.myRouteService.getCurrentRoute().subscribe((route: string) => {
      this.currentRoute = route;
      // Check if current route is a group page with ID
      const groupRouteMatch = route.match(/\/group\/(\d+)/);
      if (groupRouteMatch) {
        this.groupId = groupRouteMatch[1];
      } else {
        this.groupId = null;
      }
    });
  }

  navigate()
  {
    if (this.currentRoute.includes('/home')) {
      this.router.navigate(['/addevent']);
    } else if (this.currentRoute.includes('/groups')) {
      this.router.navigate(['/addgroup']);//to addgroup
    } else if (this.currentRoute.includes('/group/')) {
      this.router.navigate(['/addevent',this.groupId]);//to addgroup
    }  
  }

  navigateadduser() {
    this.myRouteService.navigateTo(`/adduser/${this.groupId}`);
  }

}
