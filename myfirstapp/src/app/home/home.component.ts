import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) {
   
  }

  ngOnInit(): void {
    this.userLogged = this.dataService.isLogged;
    this.dataService.dataChannel.subscribe((data: any) => {
      console.log('home: Data recieved form next');
      console.log(data);

    });

    this.dataService.userStatus.subscribe((status: boolean) => {
      this.userLogged = status;
    });
      }


  userLogged: boolean = false;

 

  @Output() barSelected = new EventEmitter<string>();

  selectBar(feature: string) {
    this.barSelected.emit(feature);
  }

  logoutUser() {
    console.log('Logging OUT user');
    this.dataService.logoutUser().subscribe({
      next: (data) => {
        console.log('Logged out user');
        console.log(data);
        localStorage.clear(); 
        this.userLogged = false;
        this.dataService.isLogged = false;
        this.dataService.userStatus.emit(false);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}