import { Component, Output, EventEmitter, signal, OnInit,effect } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Mainservice } from '../main.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';
import { LoadingService } from '../Services/isloading.service';
import { AuthServiceObsv } from '../Services/authobsv.service';


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
export class LoginFormComponent implements OnInit {

  isloading=false;
  isLoggedIn: boolean = false;
  constructor(private service: Mainservice,
     private router: Router,
     public auth1:AuthServiceObsv,
     private loadingservice:LoadingService
    ) { 
    }
    

  private jwtservice:JwtService=new JwtService;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit(): void {

    this.auth1.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log('Login state updated:', isLoggedIn);
    });

    if(this.isLoggedIn){
      this.router.navigate(['/home']);
    }
    // this.checkiflogedin()
    // if(this.auth.isLogedin()){
    //   this.router.navigate(['/home']);
    // }
    // this.firebaseService
    //   .signIn('mhajnabkr@gmail.com', 'b111aker')
    //   .then((userCredential) => {
    //     console.log('User signed in:', userCredential.user);
    //   })
    //   .catch((error) => {
    //     console.error('Error signing in:', error);
    //   });
  }
  
  submit() {
    if (this.form.valid) {
      this.loadingservice.settrue()
      // this.auth.login(this.form.value)
      this.auth1.login(this.form.value)
    }
  }
  @Output() submitEM = new EventEmitter();
}
