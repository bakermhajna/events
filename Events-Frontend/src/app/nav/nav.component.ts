import { Component, signal } from '@angular/core';
import { MatselectComponent } from "../matselect/matselect.component";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatselectComponent,MatButtonModule,MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(private router:Router){}

  navtoaddevent()
  {
    this.router.navigate(["/addevent"]);
    
  }

}
