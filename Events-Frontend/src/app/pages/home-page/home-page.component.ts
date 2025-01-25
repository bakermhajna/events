import { Component, OnInit } from '@angular/core';
import { Mainservice } from '../../Services/main.service';
import { Event } from "../../models/event"
import { MatcardComponent } from "../../components/matcard/matcard.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { Observable, catchError, map, of, share, startWith, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

interface ViewState {
  status: 'loading' | 'error' | 'data';
  error?: string;
  data?: Event[];
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatcardComponent, MatProgressSpinnerModule, AsyncPipe],
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
                            <app-matcard [event]="event"></app-matcard>
                        }
                    </div>
                }
            }
        }
    </div>
    <button (click)="logout()">log out</button>
</div>
  `,
  styles:``
})
export class HomePageComponent implements OnInit {
  viewState$!: Observable<ViewState>;
  etag: string = "";
  constructor(
    private service: Mainservice,
    public auth1: AuthServiceObsv
  ) {}
    
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
    
  logout() {
    this.auth1.logout();
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
