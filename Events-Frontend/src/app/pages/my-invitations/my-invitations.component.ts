import { Component } from '@angular/core';
import { Mainservice } from '../../Services/main.service';
import { Invitation } from '../../models/Invitation';
import { HttpResponse } from '@angular/common/http';
import { AuthServiceObsv } from '../../Services/authobsv.service';

@Component({
  selector: 'app-my-invitations',
  standalone: true,
  imports: [],
  template: `
    <p>
      my-invitations works!
    </p>
  `,
  styles: [``]
})
export class MyInvitationsComponent {

  constructor(private mainService:Mainservice,private authService:AuthServiceObsv){}

  ngOnInit(){
    this.mainService.getInvitations().subscribe((res:HttpResponse<Invitation[]>)=>{
      console.log(res);
    });
  }

}
