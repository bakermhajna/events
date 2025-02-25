import { Component, OnInit } from '@angular/core';
import { Mainservice } from '../../Services/main.service';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { catchError, map, share, startWith, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Event } from '../../models/event';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatcardComponent } from '../../components/matcard/matcard.component';

interface ViewState {
  status: 'loading' | 'error' | 'data';
  error?: string;
  data?: Event[];
}

@Component({
  selector: 'app-my-events',
  standalone: true,

  imports: [MatcardComponent, AsyncPipe, RouterLink],
  template: `
    <div class=" min-h-screen py-5">
      <div class="mx-auto px-4">
        @if (viewState$ | async; as state) {
          @switch (state.status) {
            @case ('loading') {
              <!-- Simple Tailwind spinner -->
              <div class="flex items-center justify-center py-10">
                <div class="h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }
            @case ('error') {
              <div class="text-red-500 font-bold">
                {{ state.error }}
              </div>
            }
            @case ('data') {
              <!-- Responsive grid in Tailwind -->
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                @for(event of state.data; track event.id) {
                  @if(!event.group){
                    <div
                    class="cursor-pointer"
                    [routerLink]="['/myevent', event.id]"
                  >
                    <app-matcard [event]="event"></app-matcard>
                  </div>

                  }
                }
              </div>
            }
          }
        }
      </div>
    </div>
  `,
  styles: [``]
})
export class MyEventsComponent implements OnInit {
  viewState$!: Observable<ViewState>;
  events: Event[] = [];

  constructor(
    private service: Mainservice,
    public auth1: AuthServiceObsv
  ) {}

  ngOnInit(): void {
    // Call backend to get events for the current user
    const response$ = this.service.getEventsByUser().pipe(
      map(response => response.body || []),
      tap(data => (this.events = data)),
      share()
    );

    // Map the data stream into a ViewState object
    this.viewState$ = response$.pipe(
      map(data => ({
        status: 'data' as const,
        data
      })),
      catchError(error =>
        of({
          status: 'error' as const,
          error: this.getErrorMessage(error)
        })
      ),
      startWith({ status: 'loading' as const })
    );
  }

  private getErrorMessage(error: any): string {
    if (error.status === 404) {
      return 'No events found';
    }
    if (error.status === 403) {
      return 'Access denied';
    }
    return error.message || 'An unexpected error occurred';
  }
}
