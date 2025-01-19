import { Component, signal, OnInit,effect } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from "./footer/footer.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AuthServiceObsv } from './Services/authobsv.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent,
    MatDividerModule, MatSlideToggleModule,
    MatIconModule, MatCardModule, MatSelectModule, HttpClientModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  public isLoggedIn=false
  constructor(public auth:AuthServiceObsv){}

  ngOnInit(): void {

    this.auth.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  
  


  // set , update( oldvalue => {}) , {{ test() }}  
  // test2 = computed( () => { this.test() + 1 } ) computed value from other signals
  //effect( () => { console.log( this.test() ) } ); //for every signal inside the effect function when ever the value changed the function get excuted
  // test =input.requred<string>()
  // @Output test = new EventEmitter<string>()  this.test.emmit( param ) in html we use (test)="foo($event)" 
  // @for(user of users ; track user.id){
  //     html code
  //   }
  //@if (condition){} @else { }


}
