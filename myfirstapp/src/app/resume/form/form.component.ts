import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private editSubs!: Subscription;
  // firstFormGroup!: FormGroup;
  // secondFormGroup!: FormGroup;
  isLinear = false;
 
  
  

  constructor(private fb: FormBuilder, private dataservice: DataService) {
    
   }

  ngOnInit(): void {

    console.log('Form data comp loaded');
    this.createNewForm();

    this.editSubs = this.dataservice.editResumeSelect.subscribe((data: any) => {
      console.log('Load edit from req rec for: ' + data);
      this.loadResumeData(data);
    });
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required],
    // });
    this.dataservice.previewResumeSelect.subscribe((data) => {
      this.showForm = false;
    });
    this.dataservice.templateSelect.subscribe((data) => {
      this.showForm = false;
    });
    this.dataservice.closeForm.subscribe(() => {
      this.showForm = false;
    });
  }

  @Output() sendFormResume = new EventEmitter<any>();
  ////////////    FormGroups for dynamic froms    ///////////////////

  //listening to edit request emit

  loadResumeData(id: any) {
    this.currentResumeID = id;

    this.showForm = false;
    this.showLoadMessage = true;
    this.dataservice.getOneCV(id).subscribe(
      (data: any) => {
        console.log('Single CV data recieved');
        console.log(data);
        //here we will open the resume
        this.showForm = true;
        console.log('Opening from for edit');
        this.showLoadMessage = false;
        this.editResume(data.body);
      },
      (err) => {
        console.log(err);
      }
    );
  }



  myform!: FormGroup;
  showLoadMessage: boolean =false;
  showForm: boolean=false;
  currentResumeID!: string;
  loadMessage: String = 'Fetching Loaded data...';

  disableSubmit: boolean = false;


  clickShowForm() {
    this.showForm = true;
    this.dataservice.templatesShow.next(false);
    this.myform.reset();
  }

  createNewForm(){
    this.currentResumeID = '';
    console.log('New form creating'); //hobbies is added through the chips;
    this.myform = new FormGroup({
      'userdata': new FormGroup({
        'fname': new FormControl(null, Validators.required),
        'lname': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'Address': new FormControl(null),
        'Phone' : new FormControl(null),
        'Profession': new FormControl(null),


      }),
      'project': new FormArray([]),
      'experience': new FormArray([]),
      'skill': new FormArray([]),
      'education': new FormArray([])
    

    });
  }

 


  editResume(formData: any) {
    //changing basic details
    console.log('Edit form OPENED SUCCESSFULLY');
    let currentForm = this.myform;
    let tempBasicD = formData.userdata;

    // currentForm.get('resumeName')?.setValue(formData.resumeName);
    //setting the basic details
    currentForm
      .get('userdata')
      ?.get('fname')
      ?.setValue(tempBasicD.fname);
    currentForm
      .get('userdata')
      ?.get('lname')
      ?.setValue(tempBasicD.lname);
    currentForm
      .get('userdata')
      ?.get('Profession')
      ?.setValue(tempBasicD.profession);
    currentForm.get('userdata')?.get('email')?.setValue(tempBasicD.email);
    currentForm.get('userdata')?.get('Phone')?.setValue(tempBasicD.Phone);
    // currentForm.get('userdata')?.get('city')?.setValue(tempBasicD.city);
    // currentForm.get('userdata')?.get('state')?.setValue(tempBasicD.state);
    // currentForm
    //   .get('userdata')
    //   ?.get('pinCode')
    //   ?.setValue(tempBasicD.pinCode);


    
    //adding the education

    (<FormArray>this.myform.get('education')).clear(); //removing all controls
    for (let edu of formData.education) {
      (<FormArray>this.myform.get('education')).push(
        new FormGroup({
          School: new FormControl(edu.School),
          // location: new FormControl(edu.location),
          Degree: new FormControl(edu.Degree),
          // fieldOfStudy: new FormControl(edu.fieldOfStudy),
          // startDate: new FormControl(new Date(edu.startDate)),
          // endDate: new FormControl(new Date(edu.endDate)),
          CGPA: new FormControl(edu.CGPA),
        })
      );
    }

    //adding the skills
    (<FormArray>this.myform.get('skill')).clear(); //removing all controls
    for (let skl of formData.skill) {
      (<FormArray>this.myform.get('skill')).push(
        new FormGroup({
          skill: new FormControl(skl.name),
          // level: new FormControl(skl.level),
        })
      );
    }
    //adding the projects
    (<FormArray>this.myform.get('project')).clear(); //removing all controls
    for (let pro of formData.project) {
      (<FormArray>this.myform.get('project')).push(
        new FormGroup({
          pname: new FormControl(pro.pname),
          // link: new FormControl(pro.link),
          // startDate: new FormControl(new Date(pro.startDate)),
          // endDate: new FormControl(new Date(pro.endDate)),
          description: new FormControl(pro.desc.join()),
        })
      );
    }

    //adding the experiences/jobs

    (<FormArray>this.myform.get('experience')).clear(); //removing all controls
    for (let job of formData.experience) {
      (<FormArray>this.myform.get('experience')).push(
        new FormGroup({
          Role: new FormControl(job.Role),
          Cname: new FormControl(job.Cname),
          // city: new FormControl(job.city),
          // startDate: new FormControl(new Date(job.startDate)),
          // endDate: new FormControl(new Date(job.endDate)),
          description: new FormControl(job.desc.join()),
        })
      );
    }


    //adding the certification
    // (<FormArray>this.myform.get('certification')).clear(); //removing all controls
    // for (let cert of formData.certification) {
    //   (<FormArray>this.myform.get('certification')).push(
    //     new FormGroup({
    //       name: new FormControl(cert.name),
    //       description: new FormControl(cert.description),
    //       link: new FormControl(cert.link),
    //       date: new FormControl(new Date(cert.date)),
    //     })
    //   );
    // }
    // this.showLoadMessage = false;

   
  }



  updateResume() {
    console.log('Update request for: ' + this.currentResumeID);
    let finalData = this.myform.value;
    // finalData['hobbies'] = this.getHobbiesArray();
    console.log(finalData);
    this.dataservice
      .updateResume(finalData, this.currentResumeID)
      .subscribe((respo: any) => {
        console.log('Update resume response');
        this.dataservice.refreshResume.emit('refresh Resume');
        console.log(respo);
      });
  }

  //saving form data
  saveResumeDate() {
    // this.disableSubmit = true;
    console.log('Saving form DATA');
    let finalData = this.myform.value;
    // finalData['hobbies'] = this.getHobbiesArray();
    console.log(finalData);
    this.dataservice.addResume(finalData).subscribe((respo: any) => {
      this.disableSubmit = false;
      console.log('New resume aded response');
      console.log(respo);
      console.log('emitting to refrest available resume');
      this.dataservice.refreshResume.emit('refresh Resume');
    });
    console.log(finalData);
  }

  deleteResume() {
    console.log('Current resume ID [delete]: ' + this.currentResumeID);
    this.dataservice.deleteCV(this.currentResumeID).subscribe((respo: any) => {
      console.log('Delete resume request send');
      console.log(respo);
      this.dataservice.refreshResume.emit('refresh Resume');
      this.showForm = false;
    });
  }
  downloadResume() {}


  resetFormResume() {
    console.log('resetting form data');
    this.myform.reset();
  }

  //adding sub components of a block

  onaddskill() {
    const nayaSkill = new FormGroup({
      Skills: new FormControl(null),

    });
    (<FormArray>this.myform.get('skill')).push(nayaSkill);
  }

  onaddproj() {
    const nayaProject = new FormGroup({
      pname: new FormControl(null),
      Detail: new FormControl(null),
    });
    (<FormArray>this.myform.get('project')).push(nayaProject);
  }

  onaddexp() {
    const nayaJob = new FormGroup({
      Cname: new FormControl(null),
      Role: new FormControl(null),
      Description: new FormControl(null),
    });
    (<FormArray>this.myform.get('experience')).push(nayaJob);
  }

  onaddedu() {
    const nayaEdu = new FormGroup({
      School: new FormControl(null),

      Degree: new FormControl(null),
      CGPA: new FormControl(null),
    });
    (<FormArray>this.myform.get('education')).push(nayaEdu);
  }

  removeformskill() {
    (<FormArray>this.myform.get('skill')).removeAt(-1);
  }
  removeformproj() {
    (<FormArray>this.myform.get('project')).removeAt(-1);
  }
  removeformexp() {
    (<FormArray>this.myform.get('experience')).removeAt(-1);
  }
  removeformedu() {
    (<FormArray>this.myform.get('education')).removeAt(-1);
  }
  getControlsproj() {
    return (this.myform.get('project') as FormArray).controls;
  }
  getControlsexp() {
    return (this.myform.get('experience') as FormArray).controls;
  }
  getControlsedu() {
    return (this.myform.get('education') as FormArray).controls;
  }
  getControlsskills() {
    return (this.myform.get('skill') as FormArray).controls;
  }
  onSubmit() {
    console.log(this.myform);
  }
}










