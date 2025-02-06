import { Component } from '@angular/core';
import { Mainservice } from '../../Services/main.service';
import { Invitation } from '../../models/Invitation';
import { HttpResponse } from '@angular/common/http';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { MatcardComponent } from "../../components/matcard/matcard.component";

@Component({
  selector: 'app-my-invitations',
  standalone: true,
  imports: [MatcardComponent],
  template: `
   
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        @for(invitation of invitations; track invitation.id) {
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
  constructor(private mainService:Mainservice,private authService:AuthServiceObsv){}

  ngOnInit(){
    this.mainService.getInvitations().subscribe((res:HttpResponse<Invitation[]>)=>{
      this.invitations = res.body || [];
    });
  }

}
