import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  constructor() { }

  profiles=[
    {
      name:'Harshit',
      section:'K17TM',
      age:18
    },
    {
      name:'deepak',
      section:'K17YH',
      age:19
    }
    ,{
      name:'Sumit',
      section:'K17GW',
      age:23
    }
  ];

  dataChange=new EventEmitter<string>();
}