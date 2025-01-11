import { Component,input } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { group } from '../../models/group';

@Component({
  selector: 'app-mat-card-group',
  standalone: true,
  imports: [MatSlideToggleModule,MatCardModule],
  templateUrl: './mat-card-group.component.html',
  styleUrl: './mat-card-group.component.css'
})
export class MatCardGroupComponent {
 public group =input.required<group>()
}
