import { Component, signal } from '@angular/core';
import { Mainservice } from '../main.service';
import { Event } from "../../models/event"
import { MatcardComponent } from "../matcard/matcard.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatcardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public events = signal<Event[] >([]);

  constructor(private service: Mainservice) { }

  ngOnInit(): void {
    this.service.getByCity(1).subscribe({
      next: (response) => {
        this.events.set(response);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }
}
