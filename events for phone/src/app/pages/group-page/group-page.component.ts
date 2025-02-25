import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mainservice } from '../../Services/main.service';
import { group } from '../../models/group';
import { Event } from '../../models/event';
import { MatcardComponent } from '../../components/matcard/matcard.component';

export type GroupResponse = { groupData: group; events: Event[] };

@Component({
  selector: 'app-group-page',
  standalone: true,
  imports: [MatcardComponent],
  // If you still want to keep a separate CSS file, keep styleUrls. Otherwise remove it if not needed.
  styleUrls: ['./group-page.component.css'],
  template: `
    <div class="mx-auto px-4 mt-4">
      <!-- Group Info Section -->
      <div class="flex flex-col md:flex-row mb-4 gap-4">
        <div class="md:w-1/3">
          <img
            [src]="image"
            alt="Group Image"
            class="w-full h-auto rounded"
          />
        </div>
        <div class="md:w-2/3">
          <h1 class="text-4xl font-bold mb-2">
            {{ groupDetails.name }}
          </h1>
        </div>
      </div>
      <h2 class="text-2xl font-semibold mb-4">الاحداث</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        @for (event of events; track event.id) {
          <app-matcard [event]="event"></app-matcard>
        }
      </div>
    </div>
  `
})
export class GroupPageComponent implements OnInit, OnDestroy {
  private groupId: string = '';
  private routeSub: Subscription;
  public groupDetails: group = {} as group;
  public events: Event[] = [];
  private user = this.mainService.getUserFromLocalStorage();
  public image: string = '';

  constructor(private route: ActivatedRoute, private mainService: Mainservice) {
    this.routeSub = this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getGroupById(this.groupId);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  getGroupById(groupId: string) {
    this.mainService.getGroupById(groupId).subscribe({
      next: res => {
        if (res.body) {
          this.groupDetails = res.body.groupData;
          this.groupDetails.ifAdmin = this.user?.id === this.groupDetails.admin.id;
          this.image = this.groupDetails.filePath[0];
          this.events = res.body.events;
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
