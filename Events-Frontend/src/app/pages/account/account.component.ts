import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { MatInputModule } from '@angular/material/input';
import { Mainservice } from '../../Services/main.service';
import { Customer } from '../../models/customer';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule, 
    MatInputModule,
    RouterLink,
    MatIconModule
  ],
  template: `

  <div class="container mt-5">
  <div class="row">
    <div class="col-md-4 text-center">
      <img  [src]="user()?.profilePicture || '../../../assets/default-avatar.jpg'" 
           alt="Profile Picture" 
           class="rounded-circle img-fluid mb-3"
           style="max-width: 200px;">
    </div>
    <div class="col-md-8">
      <mat-card class="p-4">
        <mat-card-content>
          <form>
            <div class="mb-3">
              <mat-form-field class="w-100">
                <mat-label>الرقم المعرف</mat-label>
                <input matInput [value]="user()?.id" readonly>
              </mat-form-field>
            </div>
            
            <div class="mb-3">
              <mat-form-field class="w-100">
                <mat-label>البريد الالكتروني</mat-label>
                <input matInput [value]="user()?.email" readonly>
              </mat-form-field>
            </div>

            <div class="mb-3">
              <mat-form-field class="w-100">
                <mat-label>الاسم الكامل</mat-label>
                <input matInput [value]="user()?.name">
              </mat-form-field>
            </div>

            <div class="mb-3">
              <mat-form-field class="w-100">
                <mat-label>رقم الهاتف</mat-label>
                <input matInput [value]="user()?.phoneNumber">
              </mat-form-field>
            </div>

            <!-- <button mat-raised-button color="primary">Update Profile</button> -->
          </form>
          <button (click)="logout()">تسجيل الخروج</button>
        </mat-card-content>
      </mat-card>
    </div>
  </div>
</div>

<div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <mat-card class="mb-3" [routerLink]="['/myevents']" style="cursor: pointer">
          <mat-card-content>
            <div class="d-flex align-items-center">
              <mat-icon class="me-3">event</mat-icon>
              <div>
                <h3 class="mb-0">الفعاليات الخاصة بي</h3>
                <p class="text-muted mb-0">عرض الفعاليات التي تم مشاركتها</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
      <div class="col-md-6">
        <mat-card class="mb-3" [routerLink]="['/invitations']" style="cursor: pointer">
          <mat-card-content>
            <div class="d-flex align-items-center">
              <mat-icon class="me-3">mail</mat-icon>
              <div>
                <h3 class="mb-0">الدعوات الخاصة بي</h3>
                <p class="text-muted mb-0">عرض الدعوات التي تم ارسالها</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  </div>


  `,
  styleUrl: './account.component.css'
})
export class AccountComponent {
  public user = signal<Customer | null>(null)

  constructor(private service: Mainservice, private auth1: AuthServiceObsv) {
    this.user.set(this.service.getUserFromLocalStorage())
  }

  logout() {
    this.auth1.logout();
  }


}
