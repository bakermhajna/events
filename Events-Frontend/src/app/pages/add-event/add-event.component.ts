import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mainservice } from '../../Services/main.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../Services/isloading.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit, OnDestroy {

  selectedFile: File | null = null;
  eventData = {
    name: '',
    description: '',
    date: '',
    location: '',
    capacity: 0,
    city: {
      id: 1
    }
  };
  isLoggedIn: boolean = false;
  routeSub: Subscription;
  groupId: String | null = null;
  loadingsub:Subscription
  IsLoading:boolean=false

  constructor(
    private service: Mainservice,
    private router: Router,
    private route: ActivatedRoute,
    public loadingservice: LoadingService
    ) {

    this.loadingsub=this.loadingservice.getstate().subscribe((isLoading)=>{
      this.IsLoading=isLoading
    });

    this.routeSub = this.route.params.subscribe(params => {
      this.groupId = params['id'];

    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.loadingsub.unsubscribe()
  }

  ngOnInit(): void { }


  onSubmit(): void {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.eventData.name + this.selectedFile.name);

    if (this.groupId) {
      this.service.addEventToGroup(this.groupId, this.eventData, formData).subscribe({
        next: (response) => {
          this.router.navigate(["/group", this.groupId]);
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Failed to create event.');
        }
      });
    } else {
      this.service.addEvent(formData, this.eventData).subscribe({
        next: (response) => {
          this.router.navigate(["/home"]);
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Failed to create event.');
        },
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}