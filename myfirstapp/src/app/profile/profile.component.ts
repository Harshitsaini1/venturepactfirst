import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ProfileDataService} from "../service/profile-data.service";
import {DataService} from "../service/data.service";
import {Router} from "@angular/router";
import {CanComponentDeactivate} from "../service/can-leave.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[]
})
export class ProfileComponent implements OnInit,OnChanges,CanComponentDeactivate {
  constructor(private dataService:DataService, private profileService:ProfileDataService,private router:Router) {
    console.log("Profile comp:  "+this.router.url)

    this.profileService.dataChange.subscribe((info:string)=>{
      alert('SUBS: dataChange: '+info)
    })
    //get profile data
    this.dataService.loadProfile()
      .subscribe({
        next: (data: any) => {
          console.log("data recieved Profile")
          if (data.body.status==404){
            router.navigate(['/login'])
            return;
          }
          console.log(data.body);
          this.firstname = data.body.firstname;
          this.email = data.body.email;
          this.userName = data.body.userName;
          this.showMessage=false;
        },
        error: err => {
          console.log(err)
          console.log('error occured in Profile User');
          localStorage.clear();
          router.navigate(['/login']);
        }
      })
  }

  ngOnInit(): void {
  }
  //---------Code for assignments------------------
  showMessage:boolean=true;
  editProfile:boolean=false;
  dataSaved:boolean=false;
  disableUpdate:boolean=false;
  logProcessMessage:string="Update Profile Details"

  firstname:string="";
  userName:string="";
  password:string="";
  email:string="";

  saveProfileData(){
    this.disableUpdate=true;
    this.showMessage=true;
    this.logProcessMessage="Updating Profile, wait";
    console.log("Updating user data");
    if (this.password===""){
      this.logProcessMessage="Password blank";
      this.disableUpdate=false;
      return;
    }
    console.log("Updating user start")
    this.dataService.updateUser({
      firstname:this.firstname,
      userName:this.userName,
      email:this.email,
      password:this.password
    })
      .subscribe({
        next:(data:any)=>{
          console.log("data recieved REGISTER")
          console.log(data)
          this.logProcessMessage="Profile Updated 😄";
          this.disableUpdate=false;
          this.dataSaved=true;
          localStorage.setItem('auth',JSON.stringify(data.body.jwt))
          setTimeout(()=>{
            this.showMessage=false;
          },2000)
        },
        error:err => {
          console.log(err)
          this.logProcessMessage='Error Updating user 😔'
          console.log('error occured in Regsitering User')
        }
      })
  }

  checkUserAvl(event:any){
    this.showMessage=true;
    this.logProcessMessage="Checking Email";
    console.log(event.target.value)
    if (event.target.value==""){
      this.showMessage=false;
      return;
    }
    this.dataService.checkUserName(event.target.value)
      .subscribe({
        next:data=>{
          console.log("data recieved CHECK Email")
          console.log(data);
          // @ts-ignore
          if (data.body.availableUser){
            this.disableUpdate=false;
            console.log('Email available for use')
            this.logProcessMessage="Email Available 😄";
          }
          else {
            this.disableUpdate=true;
            console.log('Email NOT available for use')
            this.logProcessMessage="Email NOT Available 😔";
          }
        },
        error:err => {
          console.log(err)
          this.logProcessMessage='Error Checking user !'
          console.log('error occured in checking User')
        }
      })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.editProfile && !this.dataSaved )
      return confirm("Do you want to discard changes?");
    else {
      return true;
    }
  }
  //---------Code for assignments------------------


  ngOnChanges(changes:SimpleChanges){
    console.log(changes)
  }
  @Input()
  profValfromRoot!:string;

  userName1:string="Harshit Kumar";
  city:string="Chandigarh";
  country="India,[IN]";
  buttonMessage="";
  saveData(){
    this.buttonMessage="Your data is saved successfully"
  }
  deleteData(){
    this.buttonMessage="Your data is Deleted successfully";
    this.country="";
    this.city="";
  }
  getCompleteAddress(){
    return `${this.userName} lives in ${this.city}, ${this.country}`
  }
  onCityChange(event:any){
    console.log(event);
    this.city=event.target.value;
  }
  changeRootVal(){
    this.profValfromRoot="Changed value"
  }

  showProfiles(){
    console.log(this.profileService.profiles)
  }
  changeName(index:number){
    this.profileService.profiles[index].name="Changed";
    console.log(this.profileService.profiles)
  }


}
