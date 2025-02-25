import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Mainservice } from './main.service';
import { LoadingService } from './isloading.service';
import { AuthServiceObsv } from './authobsv.service';


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

  // constructor(
  //   private mainService: Mainservice,
  //   private lodingservice: LoadingService,
  //   private router: Router,
  //   private login:AuthServiceObsv
  // ) {

    
  // }

  // private auth = getAuth(); 
  // private user: userinterface = {} as userinterface;


  // async googleSignIn$() {

  //   const provider = new GoogleAuthProvider();
  //   try {
  //     const credential = await signInWithPopup(this.auth, provider);
      
  //     this.user = {
  //       accessToken: await credential.user.getIdToken(),
  //       uid: credential.user.uid,
  //       displayName: credential.user.displayName,
  //       email: credential.user.email,
  //       phoneNumber: credential.user.phoneNumber,
  //       photoURL: credential.user.photoURL
  //     };

  //     try {
  //       await firstValueFrom(this.mainService.register({
  //         Gid: this.user.uid, 
  //         Email: this.user.email,
  //         name: this.user.displayName,
  //         phoneNumber: this.user.phoneNumber,
  //         photoURL: this.user.photoURL
  //       }));
  //     } catch (err) {
  //       console.warn("User registration failed (maybe already registered):", err);
  //     }

  //     try {
  //       const loginRes = await firstValueFrom(this.mainService.Glogin({
  //         token: this.user.accessToken
  //       }));
        
  //       localStorage.setItem('token', loginRes.body?.token || '');
  //       localStorage.setItem('user', JSON.stringify(loginRes.body?.customer));
  //       this.login.getIsLoggedInSubject().next(true)
  //       this.lodingservice.setfalse();
  //         this.router.navigate(['/home']);

  //     } catch (err) {
  //       console.error("Glogin error:", err);
  //     }

  //     this.lodingservice.setfalse();

  //   } catch (err) {
  //     this.lodingservice.setfalse();
  //     console.error('Google sign-in error', err);
  //   }
  // }
}
