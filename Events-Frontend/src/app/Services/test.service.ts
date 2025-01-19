import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";




@Injectable({
    providedIn: "root"
})
export class testService {

    private arraySubject = new BehaviorSubject<number[]>([]);
    public array$: Observable<number[]> = this.arraySubject.asObservable();
    constructor() {
        console.log("in test service coustructor")
        console.log(this.arraySubject.getValue())
    }

    addToArray(value: number): void {
        const currentArray = this.arraySubject.getValue(); // Get current value
        const updatedArray = [...currentArray, value]; // Add the new value
        this.arraySubject.next(updatedArray); // Emit the updated array
    }

    gett(): Observable<number[]> {
        return this.array$;

    }

}
