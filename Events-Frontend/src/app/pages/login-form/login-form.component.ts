import { Component,OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { JwtService } from '../../Services/jwt.service';
import { LoadingService } from '../../Services/isloading.service';
import { AuthServiceObsv } from '../../Services/authobsv.service';
import { Subscription } from 'rxjs';
import { Mainservice } from '../../Services/main.service';


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
  private subscrption: Subscription
  private jwtservice: JwtService = new JwtService;

  constructor(private service: Mainservice,
    private router: Router,
    public auth1: AuthServiceObsv,
    private loadingservice: LoadingService
  ) {
    this.subscrption = this.auth1.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log('Login state updated:', isLoggedIn);
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy(): void {
    this.subscrption.unsubscribe()
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
}
