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

  // //for resume template change
  // templates: templates[] = [
  //   {
  //     name: 'First',
  //     loc: 'assets/images/tmp_01.png',
  //     component: Template1Component,
  //   },
  //   {
  //     name: 'second',
  //     loc: 'assets/images/tmp_02.png',
  //     component: Template2Component,
  //   },
  //   {
  //     name: 'third',
  //     loc: 'assets/images/tmp_03.png',
  //     component: Template1Component,
  //   },
  // ];

  //   showTemplates: boolean = false;

  //   templateChange(meta: string) {
  //     this.selectedResume = meta;
  //     this.showTemplates = true;
  //     console.log('Change resume Design: ' + meta);
  //     this.dataServ.closeForm.next(false);
  //   }
  //   // public component: Type<any>

  //   showSelectedDesign(index: number) {
  //     console.log('Showing selected resume: ' + index);
  //     this.dataServ.templateSelect.next({
  //       resumeID: this.selectedResume,
  //       componentIndex: this.templates[index],
  //     });
  //   }
  // }
  // interface templates {
  //   name: string;
  //   loc: string;
  //   component: Type<any>;
  // }

}
