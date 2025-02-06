import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mainservice } from '../../Services/main.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../Services/isloading.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
  template:`
     <div class="form-container">
    <mat-card class="event-card">
      <mat-card-header>
        <mat-card-title>إنشاء فعالية</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form (ngSubmit)="onSubmit()" #eventForm="ngForm" class="event-form">
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>اسم الفعالية</mat-label>
            <input
              matInput
              type="text"
              id="name"
              [(ngModel)]="eventData.name"
              name="name"
              required
              placeholder="ادخل اسم الفعالية"
            />
          </mat-form-field>
  
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>الوصف</mat-label>
            <textarea
              matInput
              id="description"
              [(ngModel)]="eventData.description"
              name="description"
              required
              placeholder="ادخل الوصف"
            ></textarea>
          </mat-form-field>
  
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>التاريخ</mat-label>
            <input 
              matInput
              [matDatepicker]="picker"
              id="date"
              [(ngModel)]="eventData.date"
              name="date"
              required
              placeholder="اختر التاريخ"
            />
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
  
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>الموقع</mat-label>
            <input
              matInput
              type="text"
              id="location"
              [(ngModel)]="eventData.location"
              name="location"
              required
              placeholder="ادخل الموقع"
            />
          </mat-form-field>
  
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>الحجم</mat-label>
            <input
              matInput
              type="text"
              id="capacity"
              [(ngModel)]="eventData.capacity"
              name="capacity"
              required
              placeholder="ادخل الحجم"
            />
          </mat-form-field>
  
          <div class="form-group">
            <label for="file" class="file-label">صورة الفعالية:</label>
            <div class="image-upload-buttons">
              <button 
                type="button" 
                mat-raised-button 
                (click)="takepic($event)"
              >
                التقاط صورة
              </button>
              <input
                type="file"
                id="file"
                (change)="onFileSelected($event)"
                accept="image/*"
                #fileInput
                style="display: none"
              />
              <button 
                type="button" 
                mat-raised-button 
                (click)="fileInput.click()"
              >
                اختيار صورة
              </button>
            </div>
          </div>
          @if(selectedFile){
              <div>
                {{selectedFile.name}}
              </div>
            }
          <div class="actions mt-2">
            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="!selectedFile || !eventForm.valid"
            >
              إنشاء
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  </div>

  `,
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnDestroy {


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

  async takepic(event: Event) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      if (image.base64String) {
        // Convert base64 to File object
        const base64Response = await fetch(`data:image/jpeg;base64,${image.base64String}`);
        const blob = await base64Response.blob();
        this.selectedFile = new File([blob], 'camera_photo.jpg', { type: 'image/jpeg' });
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}