import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mainservice } from '../../Services/main.service';
import { Event } from '../../models/event';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-my-event',
  standalone: true,
  imports: [FormsModule],
  template:`
  <style>
    .container {
      min-height: 200vh;
    }
  </style>
  <div class="container mt-4 ">
    <div class="row mb-4">
        <div class="col-md-4">
            <img [src]="event.filePath[0]" alt="Event Image" class="img-fluid rounded">
        </div>
        <div class="col-md-8">
            <h1 class="display-4">{{event.name}}</h1>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-md-6">
            <h2>Event Details</h2>
            <div class="mb-3">
                <label for="eventName" class="form-label">Event Name</label>
                <input type="text" class="form-control" id="eventName" [(ngModel)]="event.name">
            </div>
            <div class="mb-3">
                <label for="eventDate" class="form-label">Date</label>
                <input type="date" class="form-control" id="eventDate" [(ngModel)]="event.date">
            </div>
            <div class="mb-3">
                <label for="eventLocation" class="form-label">Location</label>
                <input type="text" class="form-control" id="eventLocation" [(ngModel)]="event.location">
            </div>
            <div class="mb-3">
                <label for="eventDescription" class="form-label">Description</label>
                <textarea class="form-control" id="eventDescription" rows="3" [(ngModel)]="event.description"></textarea>
            </div>
            <button class="btn btn-primary" (click)="updateEvent()">Update Event</button>
        </div>

        <div class="col-md-6">
            <h2>Invite Users</h2>
            <div class="mb-3">
                <input type="text" class="form-control" [(ngModel)]="searchTerm" 
                       (ngModelChange)="searchUsers()" 
                       placeholder="Search users to invite...">
            </div>

            @if (searchResults.length > 0) {
                <div class="list-group mb-4">
                    @for (user of searchResults; track user.id) {
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                            {{user.name}}
                            <button class="btn btn-sm btn-primary" (click)="inviteUser(user)">
                                Invite
                            </button>
                        </div>
                    }
                </div>
            }

            <h3>Invited Users</h3>
            <div class="list-group">
                @for (invitedUser of invitedUsers; track invitedUser.id) {
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        {{invitedUser.name}}
                        <button class="btn btn-sm btn-danger" (click)="removeInvite(invitedUser)">
                            Remove
                        </button>
                    </div>
                }
            </div>
        </div>
    </div>
</div>
  `,
  styles: [``]
})
export class MyEventComponent {

  image:string="..\..\..\\assets\\default-avatar.jpg"
  event: Event = {} as Event;
  searchTerm: string = '';
  searchResults: Customer[] = [];
  invitedUsers: Customer[] = [];
  private eventId: string = '';
  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mainService: Mainservice
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      this.eventId = params['id'];
      this.getEventDetails();
    });
  }

  ngOnInit() {
    this.getInvitedUsers();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getEventDetails() {
    this.mainService.getEventById(this.eventId).subscribe({
      next: (res) => {
        if (res.body) {
          this.event = res.body;
        }
      },
      error: (err) => {
        console.error('Error fetching event details:', err);
      }
    });
  }

  getInvitedUsers() {
    this.mainService.getEventInvitedUsers(this.eventId).subscribe({
      next: (res) => {
        if (res.body) {
          console.log(res.body);
          this.invitedUsers = res.body.map(item => item.customerDto);
        }
      },
      error: (err) => {
        console.error('Error fetching invited users:', err);
      }
    });
  }

  searchUsers() {
    if (this.searchTerm.length < 2) {
      this.searchResults = [];
      return;
    }

    this.mainService.searchUsers(this.searchTerm).subscribe({
      next: (response) => {
        if (response.body) {
          // Filter out already invited users
          this.searchResults = response.body.filter(user => 
            !this.invitedUsers.some(invited => invited.id === user.id)
          );
        }
      },
      error: (err) => {
        console.error('Error searching users:', err);
      }
    });
  }

  inviteUser(user: Customer) {
    this.mainService.inviteUserToEvent(this.eventId, user.id).subscribe({
      next: (res) => {
        if (res.body) {
          this.invitedUsers.push(user);
          this.searchResults = this.searchResults.filter(u => u.id !== user.id);
        }
      },
      error: (err) => {
        console.error('Error inviting user:', err);
      }
    });
  }

  removeInvite(user: any) {
    // this.mainService.removeUserFromEvent(this.eventId, user.id).subscribe({
    //   next: (res) => {
    //     if (res.body) {
    //       this.invitedUsers = this.invitedUsers.filter(u => u.id !== user.id);
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error removing invite:', err);
    //   }
    // });
  }

  updateEvent() {
    // this.mainService.updateEvent(this.eventId, this.event).subscribe({
    //   next: (res) => {
    //     if (res.body) {
    //       console.log('Event updated successfully');
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error updating event:', err);
    //   }
    // });
  }


}
