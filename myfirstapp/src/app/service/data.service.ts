import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly ROOT_URL;

  JWT_TOKEN: string = 'null';
  isLogged: boolean = false;
  userStatus = new EventEmitter<boolean>();
  dataChannel = new Subject();

  constructor(private http: HttpClient) {
    this.ROOT_URL = "/api";
    console.log(this.ROOT_URL);

    console.log('User auth key: ' + localStorage.getItem('auth'));
    if (localStorage.getItem('auth')) this.isLogged = true;
    else this.isLogged = false;


    this.userStatus.subscribe((status: boolean) => {
      this.isLogged = status;
    });
  }

  registerUser(body: object) {
    return this.http.post(this.ROOT_URL + '/signup', body, {
      observe: 'response',
      withCredentials: true,
    });
  }
  loginUser(body: object) {
    return this.http.post(this.ROOT_URL + '/login', body, {
      observe: 'response',
      withCredentials: true,
    });
  }
  loadProfile() {
    return this.http.get(this.ROOT_URL + '/profile', {
      observe: 'response',
      withCredentials: true,
    });
  }

  updateUser(body: object) {
    return this.http.post(this.ROOT_URL + '/update', body, {
      observe: 'response',
      withCredentials: true,
    });
  }
  checkUserName(uid: string) {
    return this.http.get(this.ROOT_URL + '/checkUserId/' + uid, {
      observe: 'response',
      withCredentials: true,
    });
  }


  checkCon() {
    return this.http.get(this.ROOT_URL + '/', {
      observe: 'response' as 'body',
    });
  }

  // CV ASSIGNENT -----------------------------------------------------------------------------------------------

getData(){
  return this.http.get(this.ROOT_URL + '/getResume')
}

setResumeData(data: any) {
  // this.resumeData = data;
  return this.http.post(this.ROOT_URL, data);
}

  addResume(data: any) {
    return this.http.post(
      this.ROOT_URL + '/newResume',
      { data: data },
      {
        observe: 'response' as 'body',
      }
    );
  }

  

  logoutUser() {
    return this.http.get(this.ROOT_URL + '/logout', {
      observe: 'response',
      withCredentials: true,
    });
  }



  
  
  showProgress(message: any) {
    console.log('Data mes: ' + message);
  }
 



}
