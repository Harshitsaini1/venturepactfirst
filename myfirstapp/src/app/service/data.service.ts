import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly ROOT_URL;

  JWT_TOKEN: string = 'null';
  isLogged: boolean = false;
  userStatus = new EventEmitter<boolean>();
  editResumeSelect = new EventEmitter<String>(); //to emit the edit resume selection
  previewResumeSelect = new EventEmitter<String>(); //to emit the preview resume selection
  refreshResume = new EventEmitter<String>(); //to emit the preview resume selection
  templateSelect: Subject<any> = new Subject<any>();
  closeForm: Subject<any> = new Subject<any>();
  templatesShow: Subject<any> = new Subject<any>();
  ShowResume:Subject<any> =new Subject<any>();

  dataChannel = new Subject();

  constructor(private http: HttpClient) {
    this.ROOT_URL = "api";
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

  // CV ASSIGNENT-----------------------------------------------------------------------------------------------

  getAllCV() {
    return this.http.get(this.ROOT_URL + '/cvinfo', {
      observe: 'response' as 'body',
    });
  }
  getOneCV(id: any) {
    return this.http.post(
      this.ROOT_URL + '/cvSingle',
      { _id: id },
      {
        observe: 'response' as 'body',
      }
    );
  }

  updateResume(data: any, curId: any) {
    return this.http.post(
      this.ROOT_URL + '/updateResume',
      { curId: curId, data: data },
      {
        observe: 'response' as 'body',
      }
    );
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

  deleteCV(id: any) {
    return this.http.post(
      this.ROOT_URL + '/deleteResume',
      { _id: id },
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



  // postFile(fileToUpload: File | null): Observable<boolean> {
  //   const formData: FormData = new FormData();
  //   // @ts-ignore
  //   formData.append('myfile', fileToUpload, fileToUpload.name);
  //   const req = new HttpRequest(
  //     'POST',
  //     this.ROOT_URL + '/fileUpload',
  //     formData,
  //     {
  //       reportProgress: true,
  //       headers: new HttpHeaders({
  //         'Content-Type': 'multipart/form-data',
  //       }),
  //     }
  //   );

  //   // @ts-ignore
  //   return this.http.request(req).pipe(
  //     map((event) => DataService.getEventMessage(event, fileToUpload)),
  //     tap((message) => this.showProgress(message)),
  //     last(), // return last (completed) message to caller
  //     catchError((err: any) => {
  //       console.log(err);
  //       throw 'error in source. Details: ';
  //     })
  //   );
  // }
  // private static getEventMessage(event: HttpEvent<any>, file: File | null) {
  //   console.log(event);
  //   switch (event.type) {
  //     case HttpEventType.Sent:
  //       // @ts-ignore
  //       return `Uploading file "${file.name}" of size ${file.size}.`;

  //     case HttpEventType.UploadProgress:
  //       // Compute and show the % done:
  //       const percentDone = Math.round(
  //         (100 * event.loaded) / (event.total ?? 0)
  //       );
  //       // @ts-ignore
  //       return `File "${file.name}" is ${percentDone}% uploaded.`;

  //     case HttpEventType.Response:
  //       // @ts-ignore
  //       return `File "${file.name}" was completely uploaded!`;

  //     default:
  //       // @ts-ignore
  //       return `File "${file.name}" surprising upload event: ${event.type}.`;
  //   }
  // }
  showProgress(message: any) {
    console.log('Data mes: ' + message);
  }
 

  // //used in operators rxjs
  // printEle(data: any, container: string) {
  //   let el = document.createElement('li');
  //   el.innerText = data;
  //   document.getElementById(container)?.appendChild(el);
  // }


}
