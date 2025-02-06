import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar fixed-bottom bg-light">
      <div class="container-fluid d-flex justify-content-around">
        @for( item of navItems; track item.label){
        <button  class="btn btn-light" [routerLink]="item.route" (click)="selectTab(item)" [class.active]="selectedTab === item">
          <i class="bi" [ngClass]="'bi-' + item.icon"></i>
          <span>{{ item.label }}</span>
        </button>
        }
      </div>
    </nav>
  `,
  styles: [
    `
      .btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
      }
      .bi {
        font-size: 24px;
      }
      .active {
        color: #007bff;
      }
    `,
  ],
})
export class mobilenav {
  @Output() tabSelected = new EventEmitter<string>();

  navItems = [
    { label: 'Home', icon: 'house',route:'/home' },
    { label: 'Groups', icon: 'collection',route:'/groups' },
    { label: 'Profile', icon: 'person',route:'/account' },
  ];

  selectedTab = this.navItems[0];

  selectTab(item: any) {
    this.selectedTab = item;
    this.tabSelected.emit(item.label);
  }
}
