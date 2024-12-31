import { Input, Component, Output, EventEmitter, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Mainservice } from '../main.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


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
export class LoginFormComponent {

  constructor(private service: Mainservice) { }

  public loading =signal<Boolean>(false)
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.loading.set(true)
      this.service.login(this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem("token",response.token)
          localStorage.setItem("user",JSON.stringify(response.customer))
        },
        error: (err) => {
          console.log("err");
          console.log(err);
          this.loading.set(false)
        },
        complete: () => {
          console.log('Request completed');
          this.loading.set(false)
        },
      });
    }
  }
  @Output() submitEM = new EventEmitter();
}
