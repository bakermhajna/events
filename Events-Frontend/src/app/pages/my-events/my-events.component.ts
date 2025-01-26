import { Component } from '@angular/core';
import { Mainservice } from '../../Services/main.service';
import { HttpResponse } from '@angular/common/http';
import { AuthServiceObsv } from '../../Services/authobsv.service';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [],
  template: `
    <p>
      my-events works!
    </p>
  `,
  styles: [``]
})
export class MyEventsComponent {

  constructor(private mainService:Mainservice ){}

  ngOnInit(){
    this.mainService.getEventsByUser().subscribe((res)=>{
      console.log(res);
    });
  }

}
