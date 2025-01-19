import { Component, effect, Inject, OnInit, signal } from '@angular/core';
import { Mainservice } from '../main.service';
import { group } from '../../models/group';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardGroupComponent } from '../mat-card-group/mat-card-group.component';
import { Router } from '@angular/router';
import { AuthServiceObsv } from '../Services/authobsv.service';
import { testService } from '../Services/test.service';



@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatCardGroupComponent],
  templateUrl: './groups-page.component.html',
  styleUrl: './groups-page.component.css'
})
export class GroupsPageComponent implements OnInit {

  public groups = signal<group[] | null>([]);
  public loading = signal<Boolean>(false)
  isLoggedIn=false;
  private user = this.service.getUserFromLocalStorage()

  constructor(private service: Mainservice,
      private router: Router,
      public auth1:AuthServiceObsv) {}
    
  ngOnInit(): void {
    
    let sub=this.auth1.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    if (!this.isLoggedIn) {
      sub.unsubscribe()
      this.router.navigate(['']);
    } else {
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
}
