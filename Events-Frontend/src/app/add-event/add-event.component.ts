import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Mainservice } from '../main.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
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

  constructor(private service: Mainservice) { }

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
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Failed to create event.');
      },
    });

  }

}
