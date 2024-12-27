import { Component } from '@angular/core';
import { MatselectComponent } from "../matselect/matselect.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatselectComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
