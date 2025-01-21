
import { Injectable,signal } from '@angular/core';

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