import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
// import { Template1Component } from './template1/template1.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DisplayComponent implements OnInit {

  constructor(
    private dataservice: DataService,
    private router: Router
  ) { }
  showLoadMessage: boolean = false;
  myresumedata : any;
  showResume: boolean = false;
  ngOnInit(): void {

    this.dataservice.getData().subscribe(
      (res) => {      
        console.log("mydata");
        console.log(res);
        this.myresumedata = JSON.parse(JSON.stringify(res)).data;
        this.showResume=true;
        console.log("myresume data ", this.myresumedata);
        console.log(this.myresumedata.userdata.fname);
      },
      (err) => console.error(err)
    );   
}
// 
  // function 
  // http call 
  // click listener
  // api in Backend
  closeResume() {
    this.showResume = false;
    this.router.navigate(['']);
    console.log("display navigate to home");
  }


  Download() {
    const resume: any = document.querySelector('#MyResume');
    html2canvas(resume, { allowTaint: true, useCORS: true }).then((canvas) => {
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(img, 'JPEG', 0, 0, width, height);
      pdf.save('Resume.pdf');  
    });  
  }  
}