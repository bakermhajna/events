import { Component, signal, effect, Inject, Injector } from '@angular/core';
import { Mainservice } from '../main.service';
import { Event } from "../../models/event"
import { MatcardComponent } from "../matcard/matcard.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthServiceObsv } from '../Services/authobsv.service';
import { testService } from '../Services/test.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatcardComponent, MatProgressSpinnerModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  tt() {
    this.auth1.logout()
  }
  public events = signal<Event[] | null>([]);
  public loading = signal<Boolean>(false)
  isLoggedIn = false

  constructor(private service: Mainservice,
    private router: Router,
    public auth1: AuthServiceObsv) {

  }

  ngOnInit(): void {

    let sub=this.auth1.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    if (!this.isLoggedIn) {
      sub.unsubscribe()
      this.router.navigate(['']);
    } else {

      this.auth1.islogedinandroute()
      this.loading.set(true)
      this.service.getByCity(1).subscribe({
        next: (response) => {
          this.events.set(response.body);
          localStorage.setItem("data", JSON.stringify(response.body));
          localStorage.setItem("Etag", response.headers.get('ETag') ?? "");
        },
        error: (err) => {
          console.log(err);
          if (err.status === 304) {
            this.loadfromLocalStorage()
            console.log('Not Modefied');
          }
          this.loading.set(false)
        },
        complete: () => {
          this.loading.set(false)
          console.log('Request completed');
        },
      });
      
    }
  }

  loadfromLocalStorage(): Event[] {
    let data = localStorage.getItem("data")
    if (data != null) {
      this.events.set(JSON.parse(data));
    }
    return []
  }
}
