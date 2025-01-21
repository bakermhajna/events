import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Mainservice } from '../../Services/main.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit,OnDestroy {

  selectedFile: File | null = null;
  eventData = {
    name: '',
    description: '',
    date: '',
    location: '',
    capacity:0,
    city:{
      id:1
    }
  };
  isLoggedIn:boolean=false;
  sub:Subscription;

  constructor(private service: Mainservice,private router:Router,private auth:AuthServiceObsv) { 
    this.sub=this.auth.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log('Login state updated:', isLoggedIn);
    });
  }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.eventData.name+this.selectedFile.name);
    this.service.addEvent(formData,this.eventData).subscribe({
      next: (response) => {
        console.log('Event created successfully:', response);
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Failed to create event.');
      },
    });
  }
}