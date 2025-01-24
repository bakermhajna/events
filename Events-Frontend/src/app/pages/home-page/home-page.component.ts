import { Component, signal,OnInit, OnDestroy } from '@angular/core';
import { Mainservice } from '../../Services/main.service';
import { Event } from "../../models/event"
import { MatcardComponent } from "../../components/matcard/matcard.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatcardComponent, MatProgressSpinnerModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit,OnDestroy {

  public events = signal<Event[] | null>([]);
  public loading = signal<Boolean>(false)
  isLoggedIn = signal<boolean>(false)
  
  constructor(private service: Mainservice,
    public auth1: AuthServiceObsv) {}
    
    ngOnDestroy(): void {
    }
    
    ngOnInit(): void {
      this.loading.set(true)
      this.service.getByCity(1).subscribe({
        next: (response) => {
          this.events.set(response.body);
          localStorage.setItem("data", JSON.stringify(response.body));
          localStorage.setItem("Etag", response.headers.get('ETag') ?? "");
        },
        error: (err) => {
          if (err.status === 304) {
            this.loadfromLocalStorage()
            console.log('Not Modefied');
          }
          this.loading.set(false)
        },
        complete: () => {
          this.loading.set(false)
        },
      });
    }
    
    logout() {
      this.auth1.logout()
    }

    loadfromLocalStorage(): Event[] {
      let data = localStorage.getItem("data")
    if (data != null) {
      this.events.set(JSON.parse(data));
    }
    return []
  }
}
