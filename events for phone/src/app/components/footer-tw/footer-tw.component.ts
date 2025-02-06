import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-footer-tw',
  standalone: true,
  imports: [],
  templateUrl: './footer-tw.component.html',
  styleUrl: './footer-tw.component.css'
})
export class FooterTwComponent {
  constructor(private router:Router) { }
  navTo(path: String) {
    this.router.navigate([path]);
  }

}
