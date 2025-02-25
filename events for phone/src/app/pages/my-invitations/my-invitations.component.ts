import { Component } from '@angular/core';
import { Mainservice } from '../../Services/main.service';
import { Invitation } from '../../models/Invitation';
import { HttpResponse } from '@angular/common/http';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { MatcardComponent } from '../../components/matcard/matcard.component';

@Component({
  selector: 'app-my-invitations',
  standalone: true,
  // If you've removed Angular Material completely, keep or remove MatcardComponent as needed
  imports: [MatcardComponent],
  template: `
    <div class=" min-h-screen py-5">
      <div class="mx-auto px-4">
        <!-- Tailwind grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          @for (invitation of invitations; track invitation.id) {
              <app-matcard [event]="invitation.eventDto"></app-matcard>
          }
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class MyInvitationsComponent {
  invitations: Invitation[] = [];

  constructor(
    private mainService: Mainservice,
    private authService: AuthServiceObsv
  ) {}

  ngOnInit() {
    this.mainService.getInvitations().subscribe((res: HttpResponse<Invitation[]>) => {
      this.invitations = res.body || [];
    });
  }
}
