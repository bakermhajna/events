
import { Injectable, Signal, signal } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { Mainservice } from '../main.service';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';


@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class LoadingService {

    public IsLoading = signal<boolean>(false);

    settrue(){
        this.IsLoading.set(true)
    }

    
    setfalse(){
        this.IsLoading.set(false)
    }

    
    changestate(){
        this.IsLoading.update(old=>!old)
    }


}