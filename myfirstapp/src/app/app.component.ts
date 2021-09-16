import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myfisrtapp';
  constructor(
    private dataService: DataService,
    private router: Router,
    private actRoute: ActivatedRoute,
  ) {
    console.log('App Component:  constructor called');
  }

  ngOnInit() {
    console.log('App Component:  NG-ON-init called');
    console.log('User auth key: ' + localStorage.getItem('auth'));
    console.log(this.router.url);

    if (localStorage.getItem('auth')) {
      this.dataService.isLogged = true;
      this.router.navigate(['/profile']);
      // this.router.navigate(['/resume']);
    } else {
      this.dataService.isLogged = false;
      this.router.navigate(['/login']);
    }
    this.dataService.dataChannel.subscribe((data: any) => {
      console.log('Data recieved form next');
      console.log(data);
    });
  }
}