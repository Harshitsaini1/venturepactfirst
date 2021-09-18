import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  isLinear = false;
  constructor(private dataservice: DataService, private router:Router) {

  }

  

  myform!: FormGroup;
  showLoadMessage: boolean = false;
  showForm: boolean = false;
  currentResumeID!: string;
  loadMessage: String = 'Fetching Loaded data...';

  disableSubmit: boolean = false;
  clickShowForm() {
    this.showForm = true;
    this.dataservice.templatesShow.next(false);
    this.myform.reset();
  }

  

  ngOnInit(): void {
    console.log('Form data comp loaded');
    this.createNewForm();
    // this.editSubs = this.dataservice.editResumeSelect.subscribe((data: any) => {
    //   console.log('Load edit from req rec for: ' + data);
    //   this.loadResumeData(data);
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
  





  //   this.dataservice.editResume().subscribe(
  //     (res) => {
  //       const exp = JSON.parse(JSON.stringify(res)).experience;
  //       for (let i = 0; i < exp.length - 1; i++) {
  //         this.onaddexp();
  //       }

  //       const pro = JSON.parse(JSON.stringify(res)).project;
  //       for (let i = 0; i < pro.length - 1; i++) {
  //         this.onaddproj();
  //       }

  //       // const cer = JSON.parse(JSON.stringify(res)).certification;
  //       // for (let i = 0; i < cer.length - 1; i++) {
  //       //   this.onAddCertifiction();
  //       // }

  //       const edu = JSON.parse(JSON.stringify(res)).education;
  //       for (let i = 0; i < edu.length - 1; i++) {
  //         this.onaddedu();
  //       }

  //       this.myform.patchValue({
          
  //         fname: JSON.parse(JSON.stringify(res)).userdata.fname,
  //         lname: JSON.parse(JSON.stringify(res)).userdata.lname,
  //         email: JSON.parse(JSON.stringify(res)).userdata.email,
  //         Phone: JSON.parse(JSON.stringify(res)).userdata.Phone,
  //         Address: JSON.parse(JSON.stringify(res)).userdata.Address,
  //         Profession: JSON.parse(JSON.stringify(res)).userdata.Profession,
  //         skills: JSON.parse(JSON.stringify(res)).skills,
  //         // profile: JSON.parse(JSON.stringify(res)).profile,
  //         // linkedin: JSON.parse(JSON.stringify(res)).linkedin,
  //         // facebook: JSON.parse(JSON.stringify(res)).facebook,
  //         // instagram: JSON.parse(JSON.stringify(res)).instagram,
  //         // languages: JSON.parse(JSON.stringify(res)).languages,
  //         // objective: JSON.parse(JSON.stringify(res)).objective,
  //         experience: JSON.parse(JSON.stringify(res)).experience,
  //         project: JSON.parse(JSON.stringify(res)).project,
  //         // certification: JSON.parse(JSON.stringify(res)).certification,
  //         education: JSON.parse(JSON.stringify(res)).education,
  //       });
  //     },
  //     (err) => console.error(err)
  //   );
  }

//  saving form data
// saveResumeData() {
//   // console.log(this.resumeForm.value);
//   this.dataservice.setResumeData(this.myform.value).subscribe(
//     (res) => {
//       console.log(res);
//       this.router.navigate(['/display']);
//     },
//     (err) => console.error(err)
//   );
// }

@Output() sendFormResume = new EventEmitter<any>();

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


createNewForm() {
  console.log('New form creating');
  this.myform = new FormGroup({
    'userdata': new FormGroup({
      'fname': new FormControl(null, Validators.required),
      'lname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'Address': new FormControl(null),
      'Phone': new FormControl(null),
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
      ?.setValue(tempBasicD.Profession);
    currentForm.get('userdata')?.get('email')?.setValue(tempBasicD.email);
    currentForm.get('userdata')?.get('Phone')?.setValue(tempBasicD.Phone);
    currentForm.get('userdata')?.get('Address')?.setValue(tempBasicD.Address);
    // currentForm.get('userdata')?.get('city')?.setValue(tempBasicD.city);
    // currentForm.get('userdata')?.get('state')?.setValue(tempBasicD.state);
    // // currentForm
    //   .get('userdata')
    //   ?.get('pinCode')
    //   ?.setValue(tempBasicD.pinCode);



    //adding the education

    (<FormArray>this.myform.get('education')).clear(); //removing all controls
    for (let edu of formData.education) {
      (<FormArray>this.myform.get('education')).push(
        new FormGroup({
          School: new FormControl(edu.School),
        
          Degree: new FormControl(edu.Degree),
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


    // adding the certification
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
    this.showLoadMessage = false;


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

  // saving form data
  saveResumeData() {
    // this.disableSubmit = true;
    console.log('Saving form DATA');
    let finalData = this.myform.value;
    console.log("my final data");
    // finalData['hobbies'] = this.getHobbiesArray();
    console.log(finalData);
    this.dataservice.addResume(finalData).subscribe((respo: any) => {
      this.disableSubmit = false;
      console.log('New resume aded response');
      console.log(respo);
      console.log('emitting to refrest available resume');
      this.dataservice.refreshResume.emit('refresh Resume');
     
      this.router.navigate(['/display']);
    });
    console.log("data is:");
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
  downloadResume() { }


  resetFormResume() {
    console.log('resetting form data');
    this.myform.reset();
  }
  //adding sub components of a block

  onaddskill() {
    const nayaSkill = new FormGroup({
      Skills: new FormControl(null)
    });
    (<FormArray>this.myform.get('skill')).push(nayaSkill);
  }

  onaddproj() {
    const nayaProject = new FormGroup({
      pname: new FormControl(null),
      Description: new FormControl(null),
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










