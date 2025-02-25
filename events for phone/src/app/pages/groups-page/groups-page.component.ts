import { Component,OnDestroy, OnInit, signal } from '@angular/core';
import { Mainservice } from '../../Services/main.service';
import { group } from '../../models/group';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardGroupComponent } from '../../components/mat-card-group/mat-card-group.component';
import { Subscription } from 'rxjs';
import { RouterLinkWithHref } from '@angular/router';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { GroupCardComponent } from "../../components/group-card-tailwind/group-card.component";



@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatCardGroupComponent, RouterLinkWithHref, GroupCardComponent],
  template:`
  <div class="album ">
    <div class="container">
        @if (loading()) {
        <mat-spinner></mat-spinner>
        }@else{
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            @for(group of groups() ; track group.id){
            <div [routerLink]="['/group', group.id]" style="cursor: pointer">
                <!-- <app-mat-card-group [group]="group"></app-mat-card-group> -->
                 <app-group-card [group]="group"></app-group-card>
            </div>
            }
        </div>
        }
    </div>
</div>
  `,
  styles:[``]
})
export class GroupsPageComponent implements OnInit, OnDestroy {

  public groups = signal<group[] | null>([]);
  public loading = signal<Boolean>(false)
  isLoggedIn = false;
  private user = this.service.getUserFromLocalStorage()

  constructor(private service: Mainservice) {}
  
  ngOnDestroy(): void {
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
        },
      }
    )
  }
}
