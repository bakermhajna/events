import { Component ,input,signal} from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { Event } from '../../models/event';
@Component({
  selector: 'app-matcard',
  standalone: true,
  imports: [MatSlideToggleModule,MatCardModule],
  templateUrl: './matcard.component.html',
  styleUrl: './matcard.component.css'
})
export class MatcardComponent {

  event =input.required<Event>()

}
