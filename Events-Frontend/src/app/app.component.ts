import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from "./card/card.component";
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from "./footer/footer.component";
import { GroupCardComponent } from "./group-card/group-card.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatcardComponent } from "./matcard/matcard.component";
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatselectComponent } from "./matselect/matselect.component";
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomePageComponent } from "./home-page/home-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent,
    MatDividerModule, MatSlideToggleModule,
    MatIconModule, MatCardModule, MatSelectModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {


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
