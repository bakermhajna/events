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
  templateUrl: './add-user-to-group.component.html',
  styleUrl: './add-user-to-group.component.css'
})
export class AddUserToGroupComponent implements OnDestroy {
  userId: string = '';
  private groupId: string = '';
  private routeSub: Subscription;
  public IsLoading: boolean = false;
  private loadingsub:Subscription

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
}
