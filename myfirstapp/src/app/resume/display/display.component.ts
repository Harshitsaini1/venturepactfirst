import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Subscription } from 'rxjs';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// import { Template1Component } from './template1/template1.component';
import { PlaceholderDirectiveDirective } from 'src/app/placeholder-directive.directive';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DisplayComponent implements OnInit {

  constructor(
    private dataservice: DataService,
    private compFacRes: ComponentFactoryResolver
  ) { }
  private previewSubs!: Subscription;
  showLoadMessage: boolean = false;
  inpResumeData!: any;
  showResume: boolean = false;
  @Output() closeRes = new EventEmitter<any>();


  ngOnInit(): void {
    this.previewSubs = this.dataservice.previewResumeSelect.subscribe(
      (data: any) => {
        console.log('Recieved display request : opening ');
        this.showLoadMessage = true;
        this.dataservice.getOneCV(data).subscribe(
          (resp: any) => {
            console.log('Data recieved to display');
            console.log(resp);
            this.inpResumeData = resp.body;
            this.showLoadMessage = false;
            this.showResume = true;
          },
          (error) => {
            console.log('Error retrieving data');
          });
      });



      this.dataservice.templateSelect.subscribe((data) => {
        console.log('Change template request');
        console.log(data.resumeID);
        console.log(this.inpResumeData);
        //if we have a resume and that is the currently selected one then, no need to refresh data
        if (this.inpResumeData && data.resumeID === this.inpResumeData._id) {
          console.log('Data resume available');
          // this.showTemplateResume(data.componentIndex.component);
        } else {
          console.log('Resume data no available loadin and then showing');
          this.showLoadMessage = true;

          this.dataservice.getOneCV(data.resumeID).subscribe(
            (resp: any) => {
              console.log('Data recieved to display');
              console.log(resp);
              this.inpResumeData = resp.body;
              this.showLoadMessage = false;
              this.showResume = true;
              // this.showTemplateResume(data.componentIndex.component);
            },
            (error) => {
              console.log('Error retrieving data');
            }
          );
        }
      });
  }



  closeResume() {
    this.closeRes.emit(false);
    this.showResume = false;
  }

  public ngOnDestroy(): void {
    console.log('destroy display, unsub prev');
    this.previewSubs?.unsubscribe();
  }

  public get keepTogether(): string {
    return 'p';
}
@ViewChild(PlaceholderDirectiveDirective, { static: true })
resumeDesignPrev!: PlaceholderDirectiveDirective;



showTemplateResume(comp: any) {
  console.log('Show template design');
  this.showResume = false;
  const componentFactory = this.compFacRes.resolveComponentFactory(comp);

const viewContainerRef = this.resumeDesignPrev.viewContRef;
viewContainerRef.clear();

const componentRef =
  viewContainerRef.createComponent<typeof comp>(componentFactory);
console.log('added the resume data to new template');
componentRef.instance.inpResumeData = this.inpResumeData;
  }
//   to create different resume template preview, we will use the component factory
//   one will be default template, other will be preview templates
}