import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Mainservice } from '../main.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  constructor(private service: Mainservice) { }

  
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.service.login(this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem("token",response.token)
        },
        error: (err) => {
          console.log("err");
          console.log(err);
        },
        complete: () => {
          console.log('Request completed');
        },
      });
    }
  }
  @Output() submitEM = new EventEmitter();
}
