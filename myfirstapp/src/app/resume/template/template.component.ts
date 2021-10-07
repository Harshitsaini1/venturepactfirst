import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})


export class TemplateComponent implements OnInit {

  constructor(
    private dataservice: DataService,
    private router: Router
  ) { }
  showLoadMessage: boolean = false;
  myresumedata: any;
  showResume: boolean = false;
  showData = false;
  ngOnInit(): void {

    this.dataservice.getData().subscribe(
      (res) => {
        console.log("mydata");
        console.log(res);
        this.myresumedata = JSON.parse(JSON.stringify(res)).data;
        this.showResume = true;
        console.log("myresume data ", this.myresumedata);
        console.log(this.myresumedata.userdata.fname);
        console.log(this.myresumedata.project.pname);
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

  TemplateChange() {
    this.router.navigate(['all']);
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

