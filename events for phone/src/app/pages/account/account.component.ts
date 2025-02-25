import { Component, signal } from '@angular/core';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { Mainservice } from '../../Services/main.service';
import { Customer } from '../../models/customer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    RouterLink // For [routerLink] usage in pure HTML elements
  ],
  styleUrls: ['./account.component.css'],
  template: `
    <div class="container mx-auto px-4">
      <!-- Profile Section -->
      <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div class="w-full md:w-1/3 text-center">
          <img
            [src]="user()?.profilePicture || '../../../assets/default-avatar.jpg'"
            alt="Profile Picture"
            class="w-48 h-48 rounded-full object-cover mx-auto mb-4"
          />
        </div>

        <div class="w-full md:w-2/3">
          <!-- Card container -->
          <div class="bg-white p-4 shadow-md rounded-md">
            <!-- Form fields -->
            <form>
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-1">
                  الرقم المعرف
                </label>
                <input
                  class="border border-gray-300 p-2 w-full rounded"
                  [value]="user()?.id"
                  readonly
                />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-1">
                  البريد الالكتروني
                </label>
                <input
                  class="border border-gray-300 p-2 w-full rounded"
                  [value]="user()?.email"
                  readonly
                />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-1">
                  الاسم الكامل
                </label>
                <input
                  class="border border-gray-300 p-2 w-full rounded"
                  [value]="user()?.name"
                />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-1">
                  رقم الهاتف
                </label>
                <input
                  class="border border-gray-300 p-2 w-full rounded"
                  [value]="user()?.phoneNumber"
                />
              </div>
            </form>

            <!-- Logout button -->
            <button
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              (click)="logout()"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>

      <!-- Events/Invitations Section -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Card for My Events -->
        <div
          class="bg-white shadow-md rounded-md p-4 cursor-pointer flex items-center gap-3"
          [routerLink]="['/myevents']"
        >
          <!-- Example icon (calendar) using inline SVG -->
          <svg
            class="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 2v2M8 2v2M3 8h18M4 22h16a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v13a1 1 0 001 1z"
            ></path>
          </svg>
          <div>
            <h3 class="text-lg font-semibold mb-1">الفعاليات الخاصة بي</h3>
            <p class="text-gray-600 text-sm">عرض الفعاليات التي تم مشاركتها</p>
          </div>
        </div>

        <!-- Card for Invitations -->
        <div
          class="bg-white shadow-md rounded-md p-4 cursor-pointer flex items-center gap-3"
          [routerLink]="['/invitations']"
        >
          <!-- Example icon (mail) using inline SVG -->
          <svg
            class="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 7.5l-9 5.625L3.75 7.5m18-3H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5h18a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5z"
            ></path>
          </svg>
          <div>
            <h3 class="text-lg font-semibold mb-1">الدعوات الخاصة بي</h3>
            <p class="text-gray-600 text-sm">عرض الدعوات التي تم ارسالها</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AccountComponent {
  public user = signal<Customer | null>(null);

  constructor(
    private service: Mainservice,
    private auth1: AuthServiceObsv
  ) {
    this.user.set(this.service.getUserFromLocalStorage());
  }

  logout() {
    this.auth1.logout();
  }
}
