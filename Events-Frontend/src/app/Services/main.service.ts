import { Inject, Injectable ,PLATFORM_ID  } from "@angular/core";
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Event } from "../models/event";
import { isPlatformBrowser } from "@angular/common";
import { Customer } from "../models/customer";
import { group } from "../models/group";
import { GroupResponse } from "../pages/group-page/group-page.component";
import { Invitation } from "../models/Invitation";


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

constructor(@Inject(PLATFORM_ID) private platformId: Object ,public http :HttpClient) {}

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

  getUserGroups(UserId:String):Observable<HttpResponse<group[]>>{
    return this.get<group[]>(`${this.api}/group/byuser/${UserId}`);
  }

  getGroupById(groupId:String):Observable<HttpResponse<GroupResponse>>{
    return this.get<GroupResponse>(`${this.api}/group/${groupId}`);
  }

  getInvitations():Observable<HttpResponse<Invitation[]>>{
    return this.get<Invitation[]>(`${this.api}/invitation`);
  }

  addUserToGroup(groupId:String,userId:String):Observable<HttpResponse<{msg:string}>>{
    return this.post<{msg:string}>(`${this.api}/group/adduser`,{groupId:groupId,customerId:userId});
  }

  getEventsByUser():Observable<HttpResponse<Event[]>>{
    return this.get<Event[]>(`${this.api}/event`);
  }

  getEventInvitedUsers(eventId:String):Observable<HttpResponse<{customerDto:Customer}[]>>{
    return this.get<{customerDto:Customer}[]>(`${this.api}/invitation/event/${eventId}`);
  }

  getEventById(eventId:String):Observable<HttpResponse<Event>>{
    return this.get<Event>(`${this.api}/event/${eventId}`);
  }

  searchUsers(searchTerm: string):Observable<HttpResponse<Customer[]>> {
    return this.get<Customer[]>(`${this.api}/users/${searchTerm}`);
  }

  inviteUserToEvent(eventId:String,userId:String):Observable<HttpResponse<{msg:string,invationSet:Customer[]}>>{
    return this.post<{msg:string,invationSet:Customer[]}>(`${this.api}/invitation/invite`,{invitedCustomers:[userId],eventId:eventId});
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

  addEventToGroup(groupId:String,event:any,formData:FormData):Observable<HttpResponse<{msg:string,groupID:String}>>{
   return this
      .post<{ filepath: string }>(  'file/upload',
        formData).pipe(
          switchMap((uploadResponse) => {
            const eventPayload = {
              ...event,
              filePath: [uploadResponse.body?.filepath], 
            };
            return this.post<{msg:string,groupID:String}>(`${this.api}/group/createevent`, {GroupId:groupId,event:eventPayload});
          })
        )
  }

  addEvent(formData:FormData,eventData:any):Observable<any>{

    return this
    .post<{ filepath: string }>(  'file/upload',
      formData).pipe(
        switchMap((uploadResponse) => {
          const eventPayload = {
            ...eventData,
            filePath: [uploadResponse.body?.filepath], 
          };
          return this.post<{msg:string,groupID:String}>(`${this.api}/event/addevent`, eventPayload);
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