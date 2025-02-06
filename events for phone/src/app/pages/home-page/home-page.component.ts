import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, catchError, map, of, share, startWith, tap } from 'rxjs';
import { Mainservice } from '../../Services/main.service';
import { Event } from "../../models/event"
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { EventCardComponent } from '../../components/event-card/event-card.component';

interface ViewState {
  status: 'loading' | 'error' | 'data';
  error?: string;
  data?: Event[];
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe,EventCardComponent],
  template: `
  <div class="album  ">
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
                  <div class=" grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  ">
                    @for(event of state.data; track event.id) {
                      <app-event-card [event]="event"></app-event-card>
                    }
                  </div>
                }
            }
        }
    </div>
  </div>
  `,
  styles: ``
})
export class HomePageComponent implements OnInit {
  viewState$!: Observable<ViewState>;
  etag: string = "";
  alertButtons = ['Action'];
  constructor(
    private service: Mainservice,
    public auth1: AuthServiceObsv,
    private router: Router
  ) { }


  opennew() {
    this.router.navigate(['/theme-test'])
  }

  ngOnInit(): void {
    const response$ = this.service.getByCity(1).pipe(
      tap(response => {
        this.etag = response.headers.get('ETag') ?? "";
      }),
      map(response => response.body || []),
      tap(data => {
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("Etag", this.etag);
      }),
      share()
    );

    this.viewState$ = response$.pipe(
      map(data => ({
        status: 'data' as const,
        data
      })),
      catchError(error => {
        if (error.status === 304) {
          return of({
            status: 'data' as const,
            data: this.loadfromLocalStorage()
          });
        }
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

  private loadfromLocalStorage(): Event[] {
    const data = localStorage.getItem("data");
    return data ? JSON.parse(data) : [];
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
