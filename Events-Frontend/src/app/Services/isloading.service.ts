
    import { Injectable,signal } from '@angular/core';
    import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class LoadingService {

    public IsLoading$ = new Subject<boolean>()
    settrue(){
        this.IsLoading$.next(true)
    }

    setfalse(){
        this.IsLoading$.next(false)
    }

    getstate(){
        return this.IsLoading$.asObservable()
    }

}