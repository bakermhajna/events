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
  templateUrl: './add-group.component.html',
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
