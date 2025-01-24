import { Component,OnInit,OnDestroy } from '@angular/core';
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
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit, OnDestroy {

  isloading = false;
  isLoggedIn: boolean = false;
  private sub:Subscription

  constructor(
    private router: Router,
    private auth1: AuthServiceObsv,
    public loadingservice: LoadingService
  ) {
    this.sub=this.loadingservice.getstate().subscribe((isLoading)=>{
      this.isloading=isLoading
    })
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }
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

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
