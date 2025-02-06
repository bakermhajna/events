import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor() {}

  subscribeToEvents(): Observable<boolean> {
    return new Observable(observer => {
      const eventSource = new EventSource('http://localhost:8080/subscribe');
      eventSource.onmessage = (event) => {
        observer.next(event.data);
      };
      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };
      return () => eventSource.close();
    });
  }
}
