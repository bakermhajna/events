import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Mainservice } from '../main.service';
@Component({
  selector: 'app-matselect',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './matselect.component.html',
  styleUrl: './matselect.component.css'
})
export class MatselectComponent {



}
