import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLinkWithHref],
  template: `
   <nav class="navbar navbar-light navbar-expand rounded-pill shadow" style="background: #0f071f;">
    <ul class="nav nav-justified w-100" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">

            <a [routerLink]="['/home']">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                    role="tab" aria-controls="home" aria-selected="true">
                    <span><i class="bi bi-house-fill"></i></span>
                </button>
            </a>

        </li>
        <li class="nav-item" role="presentation">
            <a [routerLink]="['/groups']">

                <button class="nav-link" id="collection-tab" data-bs-toggle="tab" data-bs-target="#collection"
                    type="button" role="tab" aria-controls="notif" aria-selected="false">
                    <span><i class="bi bi-collection"></i></span>
                </button>
            </a>
        </li>
        <li class="nav-item" role="presentation">
            <a [routerLink]="['/account']">
                <button class="nav-link" id="notes-tab" data-bs-toggle="tab" data-bs-target="#notes" type="button"
                    role="tab" aria-controls="intro" aria-selected="true">
                    <span><i class="bi bi-person"></i></span>
                </button>
            </a>
        </li>
    </ul>
</nav>
  `,
  styleUrl: './footer.component.css',
  styles: [`
    nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      margin: 1rem;
    }
    :host {
      display: block;
      height: 50px; /* Adjust based on your footer height */
    }
  `],
})
export class FooterComponent {

}
