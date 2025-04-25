import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { LoadingService } from '../../Services/isloading.service';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../../Services/firebase.service';



@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  template: `
  <div class="login-container">
  @if (isloading) {
  <mat-spinner></mat-spinner>
  }@else {
    <div class="flex items-center justify-center px-5 mt-56 ">
      <div class="w-full max-w-md  rounded-2xl shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-center text-gray-700">تسجيل الدخول</h2>
    
        <form [formGroup]="form" (ngSubmit)="submit()" class="mt-6">
          <!-- Email Field -->
          <mat-form-field appearance="fill" class="w-full">
            <mat-label>البريد الالكتروني</mat-label>
            <input matInput type="email" formControlName="email" placeholder="ادخل البريد الالكتروني" required />
            @if(form.get('email')?.invalid && form.get('email')?.touched){
              <mat-error >
                الرجاء إدخال بريد إلكتروني صالح.
              </mat-error>

            }
          </mat-form-field>
    
          <mat-form-field appearance="fill" class="w-full mt-4">
            <mat-label>كلمة المرور</mat-label>
            <input matInput type="password" formControlName="password" placeholder="ادخل كلمة المرور" required />
            @if(form.get('password')?.invalid && form.get('password')?.touched){
              <mat-error >
                الرجاء إدخال كلمة المرور.
              </mat-error>
            }
          </mat-form-field>
    
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid" class="w-full mt-6">
            تسجيل الدخول
          </button>
        </form>
        <!-- login.component.html -->
        <div class="flex justify-center w-full items-center mt-2">
          <button
            class="flex items-center  bg-white text-gray-700 border border-gray-300
                  rounded px-4 py-2 hover:bg-gray-50 active:bg-gray-100 transition-colors w-full"
            (click)="signInWithGoogle()"
          >
            <span class="font-medium">Sign in with Google</span>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              class="w-5 h-5"
            />
          </button>
        </div>


    
        <p class="mt-4 text-sm text-center text-gray-600">
          ليس لديك حساب؟ 
          <a href="#" class="text-blue-500 hover:underline">إنشاء حساب</a>
        </p>
      </div>
    </div>
    
  }
</div>
  `,
  styles: []
})
export class LoginFormComponent implements OnDestroy,OnInit {

  isloading = false;
  isLoggedIn: boolean = false;
  private sub: Subscription
  private authsub: Subscription

  constructor(
    private router: Router,
    private auth1: AuthServiceObsv,
    public loadingservice: LoadingService,
    private fb: FirebaseService,
   
  ) {
    this.sub = this.loadingservice.getstate().subscribe((isLoading) => {
      this.isloading = isLoading
    })
    this.authsub = this.auth1.isLogedin$.subscribe((isLogedin: boolean) => {
      this.isLoggedIn = isLogedin;
      if (this.isLoggedIn) {
        this.router.navigate(['/home']);
      }
    })

  }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  submit() {
    if (this.form.valid) {
      this.loadingservice.settrue()
      this.auth1.login(this.form.value)
    }
  }

  signInWithGoogle(): void {
    this.fb.signInWithGoogle()
    //this.loadingservice.settrue()
    // this.fb.googleSignIn$();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.authsub.unsubscribe()
  }


  

  async ngOnInit() {
    // 1️⃣ Check if the user was redirected back and log them in
    // this.user = await this.authService.handleRedirect();
  }


}
