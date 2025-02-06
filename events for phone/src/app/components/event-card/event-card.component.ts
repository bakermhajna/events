import { Component, Input, OnInit, signal } from '@angular/core';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit{
  @Input() event:Event={} as Event
  imageurl = ''
  ngOnInit(): void {
    this.imageurl = this.event.filePath.at(0) ?? ""
  }

}
