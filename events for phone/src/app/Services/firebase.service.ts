import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Mainservice } from './main.service';
import { LoadingService } from './isloading.service';
import { AuthServiceObsv } from './authobsv.service';
import { Platform } from '@angular/cdk/platform';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
 
interface userinterface {
  accessToken: String | null;
  uid: String | null;
  displayName: String | null;
  email: String | null;
  phoneNumber: String | null;
  photoURL: String | null;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    constructor(){
       initializeApp(environment.firebaseConfig);
    }

    public async signInWithGoogle(): Promise<void> {
      await FirebaseAuthentication.signInWithGoogle();
    }

}
