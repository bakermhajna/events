import { Component, OnInit, signal } from '@angular/core';
import { Mainservice } from '../main.service';
import { group } from '../../models/group';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardGroupComponent } from '../mat-card-group/mat-card-group.component';


@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [MatProgressSpinnerModule,MatCardGroupComponent],
  templateUrl: './groups-page.component.html',
  styleUrl: './groups-page.component.css'
})
export class GroupsPageComponent implements OnInit {

  public groups=signal<group[] |null>([]);
  public loading =signal<Boolean>(false)
  private user=this.service.getUserFromLocalStorage()

  constructor(private service: Mainservice) { }
  
  ngOnInit(): void {
    if(this.user!=null){
      this.loading.set(true)
      this.service.getUserGroups(this.user.id).subscribe(
        {
          next: (response) => {
            this.groups.set(response.body)
            this.loading.set(false)
            localStorage.setItem("groups",JSON.stringify(response.body))
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
