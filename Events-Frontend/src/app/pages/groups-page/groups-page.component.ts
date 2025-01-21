import { Component,OnDestroy, OnInit, signal } from '@angular/core';
import { Mainservice } from '../../Services/main.service';
import { group } from '../../models/group';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardGroupComponent } from '../../components/mat-card-group/mat-card-group.component';
import { Router } from '@angular/router';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatCardGroupComponent],
  templateUrl: './groups-page.component.html',
  styleUrl: './groups-page.component.css'
})
export class GroupsPageComponent implements OnInit, OnDestroy {

  public groups = signal<group[] | null>([]);
  public loading = signal<Boolean>(false)
  isLoggedIn = false;
  private user = this.service.getUserFromLocalStorage()
  private subscrption: Subscription;

  constructor(private service: Mainservice,
    private router: Router,
    public auth1: AuthServiceObsv) {
    this.subscrption = this.auth1.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  
  ngOnDestroy(): void {
    this.subscrption.unsubscribe()
  }

  ngOnInit(): void {
    this.loading.set(true)
    this.service.getUserGroups(this.user ? this.user.id : "").subscribe(
      {
        next: (response) => {
          this.groups.set(response.body)
          this.loading.set(false)
          localStorage.setItem("groups", JSON.stringify(response.body))
          this.groups.update((old) => {
            return old
              ? old.map(group => {
                group.ifAdmin = this.user?.id === group.admin.id;
                return group;
              })
              : null;
          });
        },
        error: (err) => {
          console.log(err);
          this.loading.set(false)
        },
        complete: () => {
          this.loading.set(false)
          console.log('Request completed');
        },
      }
    )
  }
}
