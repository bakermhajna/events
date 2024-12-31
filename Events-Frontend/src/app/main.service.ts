import { Inject, Injectable ,PLATFORM_ID  } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Event } from "../models/event";
import { isPlatformBrowser } from "@angular/common";


export interface authResponse{
  msg:string,
  token:string
}
@Injectable({
    providedIn:"root"
})
export class Mainservice{
    private baseUrl = 'http://localhost:8080/api/v1'; 

constructor(@Inject(PLATFORM_ID) private platformId: Object ,public http :HttpClient) {}

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {

    let token=this.get_token()

    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();

    console.log('Headers:', headers.get('Authorization'));

    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      headers: headers,
      params: params,
    });
  }

  // POST Request
  post<T>(endpoint: string, body: any): Observable<T> {
      let token=this.get_token()

    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();

    console.log('Headers:', headers.get('Authorization'));
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {headers: headers});
  }


  addEvent(formData:FormData,eventData:any):Observable<any>{
    let token=this.get_token()

    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
    return this.http
      .post<{ filepath: string }>(  'http://localhost:8080/file/upload',
        formData, 
        {
          headers: headers,
        })
      .pipe(
        // Step 2: Use the file URL to create the event
        switchMap((uploadResponse) => {
          console.log(uploadResponse)
          const eventPayload = {
            ...eventData,
            filePath: [uploadResponse.filepath], 
          };
          
          return this.http.post(this.baseUrl+'/event/addevent', eventPayload,{
            headers: headers,
          });
        })
      )
  }

  getByCity<T>(cityId: number): Observable<Event[]> {
    return this.get<Event[]>(`event/city/${cityId}`);
  }
  login<T>(body: any): Observable<authResponse> {
    return this.post<authResponse>(`auth/login`, body);
  }


  get_token(){
    let token: string | null = null;

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
    } else {
      console.warn('Not running in a browser environment!');
    }
    return token
  }
    
}