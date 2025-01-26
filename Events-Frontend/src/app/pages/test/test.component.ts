import { Component } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, startWith, share, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface ViewState {
  status: 'loading' | 'error' | 'data';
  error?: string;
  data?: any[];
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (viewState$ | async; as state) {
      @switch (state.status) {
        @case ('loading') {
          <mat-spinner></mat-spinner>
        }
        @case ('error') {
          <div class="error">{{state.error}}</div>
        }
        @case ('data') {
          @for(data of state.data; track data) {
            <div>{{ data.fact }}</div>
          }
        }
      }
    }
  `
})
export class TestComponent {
  viewState$: Observable<ViewState>;

  constructor(private http: HttpClient) {
    const response$ = this.http.get(`https://catfact.ninja/facts`).pipe(
      map((response: any) => response.data),
      tap(data => console.log('Data fetched:', data)),
      share()
    );

    this.viewState$ = response$.pipe(
      map(data => ({
        status: 'data' as const,
        data
      })),
      catchError(error => {
        console.log(error);
        return of({
          status: 'error' as const,
          error: this.getErrorMessage(error)
        })
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
