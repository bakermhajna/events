import { Inject, Injectable ,PLATFORM_ID  } from "@angular/core";
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Event } from "../models/event";
import { isPlatformBrowser } from "@angular/common";
import { Customer } from "../models/customer";
import { group } from "../models/group";


export interface authResponse{
  msg:string,
  token:string,
  customer:Customer
}
@Injectable({
    providedIn:"root"
})
export class Mainservice{
    private baseUrl = 'http://localhost:8080'; 
    private api = 'api/v1';

constructor(@Inject(PLATFORM_ID) private platformId: Object ,public http :HttpClient) {

  console.log("main service new instence")
}

  // GET Request
  get<T>(endpoint: string,additionalHeaders: { [key: string]: string }={}  ): Observable<HttpResponse<T>> {
    const token = this.get_token();

    const headers = new HttpHeaders({
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(additionalHeaders || {}),
    });
    const Options = {
      headers: headers,
      observe: 'response' as const,
    };
  
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, Options);
  }
  
  // POST Request
  post<T>(endpoint: string, body: any,additionalHeaders: { [key: string]: string }={} ): Observable<HttpResponse<T>> {
    const token = this.get_token();

    const headers = new HttpHeaders({
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(additionalHeaders || {}),
    });

    const Options = {
      headers: headers,
      observe: 'response' as const,
    };
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, Options);
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    //Requests by api

  getByCity(cityId: number): Observable<HttpResponse<Event[]>> {
    const etag = this.get_Etag()// Retrieve ETag from localStorage
    const additionalHeaders: { [key: string]: string } = etag ? { 'If-None-Match': etag } : {};
    return this.get<Event[]>(`${this.api}/event/city/${cityId}`,additionalHeaders);
  }

  createGroup(name:String,formData?:FormData):Observable<HttpResponse<group>>{
    return this.post<{ filepath: string; }>('file/upload', formData)
      .pipe(
        switchMap((uploadResponse) => {
          const eventPayload = {
            name: name,
            filePath: [uploadResponse.body?.filepath],
          };
          return this.post<group>(`${this.api}/group/creategroup`, eventPayload);
        }
        )
      );
  }

  getUserGroups(UserId:String):Observable<HttpResponse<group[]>>{
    return this.get<group[]>(`${this.api}/group/byuser/${UserId}`);
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


  login(body: any): Observable<HttpResponse<authResponse>> {
    return this.post<authResponse>(`${this.api}/auth/login`, body);
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                //utils

  getUserFromLocalStorage():Customer |null{
    let user:Customer| null=null
    if (isPlatformBrowser(this.platformId)) {
      let localuser=localStorage.getItem('user')
      if (localuser){
        user= JSON.parse(localuser);
      }
    } else {
      console.warn('Not running in a browser environment!');
    }
    return user
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

  get_Etag(){
    let token: string | null = null;

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('Etag');
    } else {
      console.warn('Not running in a browser environment!');
    }
    return token ?? null
  }
    
}