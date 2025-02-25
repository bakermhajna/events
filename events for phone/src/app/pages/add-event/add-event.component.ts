import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mainservice } from '../../Services/main.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../Services/isloading.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  // We only keep FormsModule and ReactiveFormsModule for form handling. 
  // No Angular Material modules here.
  imports: [FormsModule, ReactiveFormsModule],
  // Remove styleUrl if you’re not using an external stylesheet. Otherwise, keep it for Tailwind or custom CSS.
  styleUrls: ['./add-event.component.css'],
  template: `
    <div class="max-w-xl mx-auto p-4">
      <div class="bg-white shadow-md rounded-md p-4">
        <h2 class="text-xl font-semibold mb-4">إنشاء فعالية</h2>
        <form (ngSubmit)="onSubmit()" #eventForm="ngForm" class="space-y-4">
          
          <!-- Event Name -->
          <div>
            <label class="block mb-1 text-gray-700 font-medium" for="name"
              >اسم الفعالية</label
            >
            <input
              type="text"
              id="name"
              name="name"
              required
              [(ngModel)]="eventData.name"
              placeholder="ادخل اسم الفعالية"
              class="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block mb-1 text-gray-700 font-medium" for="description"
              >الوصف</label
            >
            <textarea
              id="description"
              name="description"
              required
              [(ngModel)]="eventData.description"
              placeholder="ادخل الوصف"
              class="border border-gray-300 p-2 w-full rounded"
              rows="3"
            ></textarea>
          </div>

          <!-- Date -->
          <div>
            <label class="block mb-1 text-gray-700 font-medium" for="date"
              >التاريخ</label
            >
            <input
              type="date"
              id="date"
              name="date"
              required
              [(ngModel)]="eventData.date"
              placeholder="اختر التاريخ"
              class="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <!-- Location -->
          <div>
            <label class="block mb-1 text-gray-700 font-medium" for="location"
              >الموقع</label
            >
            <input
              type="text"
              id="location"
              name="location"
              required
              [(ngModel)]="eventData.location"
              placeholder="ادخل الموقع"
              class="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <!-- Capacity -->
          <div>
            <label class="block mb-1 text-gray-700 font-medium" for="capacity"
              >الحجم</label
            >
            <input
              type="number"
              id="capacity"
              name="capacity"
              required
              [(ngModel)]="eventData.capacity"
              placeholder="ادخل الحجم"
              class="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <!-- File selection and camera -->
          <div>
            <label class="block mb-1 text-gray-700 font-medium">صورة الفعالية:</label>
            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="takepic($event)"
                class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                التقاط صورة
              </button>
              <input
                type="file"
                accept="image/*"
                #fileInput
                style="display: none;"
                (change)="onFileSelected($event)"
              />
              <button
                type="button"
                (click)="fileInput.click()"
                class="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                اختيار صورة
              </button>
            </div>
            <!-- Preview selected file's name -->
            @if (selectedFile) {
              <div class="text-sm text-gray-600 mt-1">
                {{ selectedFile.name }}
              </div>
            }
          </div>

          <!-- Submit button -->
          <div class="mt-4">
            <button
              type="submit"
              [disabled]="!selectedFile || !eventForm.valid"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              إنشاء
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AddEventComponent implements OnDestroy, OnInit {
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
  loadingsub: Subscription;
  IsLoading: boolean = false;

  constructor(
    private service: Mainservice,
    private router: Router,
    private route: ActivatedRoute,
    public loadingservice: LoadingService
  ) {
    this.loadingsub = this.loadingservice.getstate().subscribe(isLoading => {
      this.IsLoading = isLoading;
    });

    this.routeSub = this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.loadingsub.unsubscribe();
  }

  onSubmit(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.eventData.name + this.selectedFile.name);

    // Create or add event to group, depending on groupId
    if (this.groupId) {
      this.service.addEventToGroup(this.groupId, this.eventData, formData).subscribe({
        next: () => {
          this.router.navigate(['/group', this.groupId]);
        },
        error: error => {
          console.error('Error:', error);
          alert('Failed to create event.');
        }
      });
    } else {
      this.service.addEvent(formData, this.eventData).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: error => {
          console.error('Error:', error);
          alert('Failed to create event.');
        }
      });
    }
  }

  async takepic(event: Event) {

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
