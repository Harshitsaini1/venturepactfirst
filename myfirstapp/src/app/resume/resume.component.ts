import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  
  constructor(private dataservice: DataService, private router: Router) { }
  loadingStatus: boolean = true;
  allResume!: Array<any>;
  message = 'Loading';
  showResume: boolean = false;

  ngOnInit(): void {
  }
  loadAllResume() {
    this.loadingStatus = true;
    this.message = 'Loading all resume';
    this.dataservice.getAllCV().subscribe(
      (data: any) => {
        console.log('(resume:loadAll resume) All cv data recieved');
        console.log(data);
        this.allResume = data.body;
        this.loadingStatus = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editResume(_id: HTMLHeadingElement) {
    console.log(_id.innerText);
    console.log('Emitting edit resume request to the form component');
    this.dataservice.editResumeSelect.emit(_id.innerText);
  }
  previewResume(_id: HTMLHeadingElement) {
    console.log(_id.innerText);
    console.log('Emitting preview resume to display component');
    this.dataservice.previewResumeSelect.emit(_id.innerText);
  }

  closeResume() {
    this.showResume = false;
  }
  openResume() {
    this.showResume = true;
  }

  public ngOnDestroy(): void {
    this.dataservice.refreshResume.unsubscribe();
  }

  
}
