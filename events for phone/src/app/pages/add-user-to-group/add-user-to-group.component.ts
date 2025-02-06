import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Mainservice } from '../../Services/main.service';
import { RouterModule } from '@angular/router';
import { LoadingService } from '../../Services/isloading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-add-user-to-group',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  template:`
  <div class="mb-3">
  <input type="text" class="form-control" [(ngModel)]="searchTerm" 
         (ngModelChange)="searchUsers()" 
         placeholder="البحث عن مستخدمين...">
</div>

@if (searchResults.length > 0) {
  <div class="list-group mb-4">
    @for (user of searchResults; track user.id) {
      <div class="list-group-item d-flex justify-content-between align-items-center">
        {{user.name}}
        <button class="btn btn-sm btn-primary" (click)="addUserToGroup(user)">
          إضافة
        </button>
      </div>
    }
  </div>
}
  `,
  styles:[``]
})
export class AddUserToGroupComponent implements OnDestroy {
  userId: string = '';
  private groupId: string = '';
  private routeSub: Subscription;
  public IsLoading: boolean = false;
  private loadingsub:Subscription
  searchTerm: string = '';
  searchResults: Customer[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Mainservice,
    public loadingservice: LoadingService) {
    this.routeSub = this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
    this.loadingsub=this.loadingservice.getstate().subscribe((isLoading)=>{
      this.IsLoading=isLoading
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.loadingsub.unsubscribe()
  }

  onSubmit() {
    this.IsLoading = true;
    this.service.addUserToGroup(this.groupId,this.userId).subscribe({
      next: (res) => {
        this.IsLoading = false;
        this.router.navigate(['/group', this.groupId]);
      },
      error: (err) => {
        console.log(err);
        this.IsLoading = false;
      }
    });
  }

  searchUsers() {
    if (this.searchTerm.length < 2) {
      this.searchResults = [];
      return;
    }

    this.service.searchUsers(this.searchTerm).subscribe({
      next: (response) => {
        this.searchResults = response.body || [];
      },
      error: (err) => {
        console.error('Error searching users:', err);
      }
    });
  }

  addUserToGroup(user: Customer) {
    this.userId = user.id;
    this.onSubmit();
  }
}
