import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyRouteService } from '../../Services/MyRoute.service';
import { AuthServiceObsv } from '../../Services/authobsv.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template:`
  <header class=" fixed top-0 left-0 w-full max-h-20 text-black p-4  shadow-md rounded-b-2xl z-50" style="background-color: white;">
    <span class="  font-bold" >افراحنا</span>
      @if(!hidePlus){
        <div (click)="navigate()" class="absolute top-5 left-14 transform -translate-x-1/2 bg-black rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
          <button class="w-14 h-14  bg-white rounded-full flex items-center justify-center text-black text-3xl shadow-lg transition duration-300 hover:bg-blue-600">
            +
          </button>
        </div>
      }
      @if(groupId){
        <div (click)="navigateadduser()" class="absolute top-5 left-32 transform -translate-x-1/2 bg-black rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
          <button class="w-14 h-14  bg-white rounded-full flex items-center justify-center text-black text-3xl shadow-lg transition duration-300 hover:bg-blue-600">
            +
          </button>
        </div>
      }
  </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() hidePlus: boolean = false;
   currentRoute: string = ''; // Store the current route
    groupId: string|null=null;
    buttonShow:boolean=false;
    sub:Subscription;
  
    constructor(private router: Router,private myRouteService: MyRouteService,private authService: AuthServiceObsv) {
      this.sub=this.authService.isLogedin$.subscribe((isLogedin:boolean)=>{
        this.buttonShow=isLogedin;
      });
    }
  
    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
    
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
        this.router.navigate(['/addgroup']);
      } else if (this.currentRoute.includes('/group/')) {
        this.router.navigate(['/addevent',this.groupId]);
      }  
    }
  
    navigateadduser() {
      this.myRouteService.navigateTo(`/adduser/${this.groupId}`);
    }
  
}
