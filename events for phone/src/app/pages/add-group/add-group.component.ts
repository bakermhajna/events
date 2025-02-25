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
import { LoadingService } from '../../Services/isloading.service';

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule,ReactiveFormsModule],
  template:`
  <div class="max-w-md mx-auto p-4">
  <!-- Container with a card-like look -->
  <div class="bg-white shadow-md rounded-md p-4">
    <h2 class="text-xl font-semibold mb-4">اضف مجموعة</h2>

    <!-- Use (ngSubmit) with Angular forms if you have FormsModule imported -->
    <form (ngSubmit)="onSubmit()" #eventForm="ngForm" class="space-y-4">
      <!-- Group name -->
      <div>
        <label
          for="name"
          class="block mb-1 text-gray-700 font-medium"
          >اسم المجموعة</label
        >
        <input
          type="text"
          id="name"
          name="name"
          placeholder="المجموعة"
          [(ngModel)]="groupName"
          required
          class="border border-gray-300 p-2 w-full rounded"
        />
      </div>

      <!-- File Upload -->
      <div>
        <label for="file" class="block mb-1 text-gray-700 font-medium"
          >Event Image:</label
        >
        <input
          type="file"
          id="file"
          required
          (change)="onFileSelected($event)"
          class="block border border-gray-300 p-2 w-full rounded"
        />
      </div>

      <!-- Submit button -->
      <div class="pt-2">
        <button
          type="submit"
          [disabled]="!eventForm.valid"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          اضف المجموعة
        </button>
      </div>
    </form>
  </div>
</div>

  `,
  styleUrl: './add-group.component.css'
})
export class AddGroupComponent implements OnInit,OnDestroy {

  selectedFile: File | null = null;
  groupName:String='' ;
  isLoggedIn:boolean=false;
  loadingsub:Subscription
  IsLoading:boolean=false


  constructor(private service: Mainservice,
    private router:Router,
    public loadingservice: LoadingService
  ) { 
    this.loadingsub=this.loadingservice.getstate().subscribe((isLoading)=>{
      this.IsLoading=isLoading
    })
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loadingsub.unsubscribe()
  }
  
  onSubmit(): void {
    if (!this.selectedFile || this.groupName=='') return;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.groupName+this.selectedFile.name);
    this.service.createGroup(this.groupName,formData).subscribe({
      next: (response) => {
        this.router.navigate(["/groups"]);
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Failed to create group.');
      },
    });
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
