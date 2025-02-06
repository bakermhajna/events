import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mainservice } from '../../Services/main.service';
import { group } from '../../models/group';
import { Event } from '../../models/event';
import { MatcardComponent } from "../../components/matcard/matcard.component";

export type GroupResponse = { groupData: group, events: Event[] }


@Component({
  selector: 'app-group-page',
  standalone: true,
  imports: [MatcardComponent],
  templateUrl: './group-page.component.html',
  styleUrl: './group-page.component.css'
})
export class GroupPageComponent implements OnInit, OnDestroy {
  
  private groupId: string = '';
  private routeSub: Subscription;
  public groupDetails: group = {} as group;
  public events: Event[] = [];
  private user = this.mainService.getUserFromLocalStorage()
  public image:string=''
  
  constructor(private route: ActivatedRoute, private mainService: Mainservice) {
    this.routeSub = this.route.params.subscribe(params => {
      this.groupId = params['id'];
      
    });
  }
  
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
  
  ngOnInit(): void {
    this.getGroupById(this.groupId)
  }

  getGroupById(groupId: string) {
    this.mainService.getGroupById(groupId).subscribe({
      next: (res) => {
        if(res.body){
          this.groupDetails = res.body.groupData;
          this.groupDetails.ifAdmin = this.user?.id === this.groupDetails.admin.id;
          this.image=this.groupDetails.filePath[0]
          this.events = res.body.events;
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

}
