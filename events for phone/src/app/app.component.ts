import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { FooterComponent } from './components/footer/footer.component';
import { AuthServiceObsv } from './Services/authobsv.service';
import { Subscription } from 'rxjs';
import { mobilenav } from "./components/mobilenav/mobilenav.component";
import { FooterTwComponent } from "./components/footer-tw/footer-tw.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, mobilenav, FooterTwComponent,HeaderComponent],  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy {
  
  public isLoggedIn=false
  public somedata=signal<String[]>([])
  private sub:Subscription;
  hideplus=false

  constructor(
    private authService: AuthServiceObsv
  ) {
    this.sub=this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn
      this.hideplus=!isLoggedIn;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }  
}