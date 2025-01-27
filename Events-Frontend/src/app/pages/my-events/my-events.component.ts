import { Component, OnInit } from '@angular/core';
import { Mainservice } from '../../Services/main.service';
import { HttpResponse } from '@angular/common/http';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { catchError, startWith } from 'rxjs/operators';
import { share, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs';
import { Event as CustomEvent, Event } from '../../models/event';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatcardComponent } from "../../components/matcard/matcard.component";
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ViewState {
  status: 'loading' | 'error' | 'data';
  error?: string;
  data?: CustomEvent[];
}

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatcardComponent, AsyncPipe, RouterLink],
  template: `

  <div class="album py-5 bg-light">
    <div class="container">
        @if (viewState$ | async; as state) {
            @switch (state.status) {
                @case ('loading') {
                    <mat-spinner></mat-spinner>
                }
                @case ('error') {
                    <div class="error">{{state.error}}</div>
                }
                @case ('data') {
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        @for(event of state.data; track event.id) {
                          <div [routerLink]="['/myevent', event.id]" style="cursor: pointer">
                            <app-matcard [event]="event"></app-matcard>
                          </div>
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
  ) { }

  ngOnInit(): void {

    const response$ = this.service.getEventsByUser().pipe(
      map(response => response.body || []),
      tap(data => {
        this.events = data;
      }),
      share()
    );

    this.viewState$ = response$.pipe(
      map(data => ({
        status: 'data' as const,
        data
      })),
      catchError(error => {
        return of({
          status: 'error' as const,
          error: this.getErrorMessage(error)
        });
      }),
      startWith({
        status: 'loading' as const
      })
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
