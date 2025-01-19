import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS-UXtLgmeoWOEAB9gYBq7e3abYipl1_g",
  authDomain: "test-431f6.firebaseapp.com",
  databaseURL: "https://test-431f6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-431f6",
  storageBucket: "test-431f6.firebasestorage.app",
  messagingSenderId: "685500863541",
  appId: "1:685500863541:web:c897116f40b266a7d30d7c",
  measurementId: "G-PMEN64GN46",
};

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class FirebaseService {
  public app: FirebaseApp;
//   public analytics: Analytics;
  public auth: Auth;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    // this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app);
  }

  getAuthInstance(): Auth {
    return this.auth;
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signout(){
    this.auth.signOut()
  }
}
