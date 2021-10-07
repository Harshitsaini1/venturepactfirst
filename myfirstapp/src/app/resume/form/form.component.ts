import { Component, OnInit} from '@angular/core';
import { FormArray,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  // myform!: FormGroup;
  myform = new FormGroup({
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
  constructor(private dataservice: DataService, private router:Router) {

  }
 
  showLoadMessage: boolean = false;
  showForm: boolean = false;
  loadMessage: String = 'Fetching Loaded data...';

  disableSubmit: boolean = false;
 


ngOnInit(): void { 
  console.log("myform loaded");
  this.dataservice.getData().subscribe((res: any)=>{
    console.log("my data", res);
    console.log(JSON.parse(JSON.stringify(res)).data.userdata.fname);
    const edu = JSON.parse(JSON.stringify(res)).data.education;
    const proj = JSON.parse(JSON.stringify(res)).data.project;
    const exp =  JSON.parse(JSON.stringify(res)).data.experience;
    const skl= JSON.parse(JSON.stringify(res)).data.skill;
    // console.log(edu.length);
    for (let i=0; i< edu.length; i++){
      this.onaddedu();
    }
    for (let i=0; i< proj.length; i++){
      this.onaddproj();
    }
    for (let i=0; i< exp.length; i++){
      this.onaddexp();
    }
    for(let i=0; i<skl.length;i++){
      this.onaddskill();
    }
  

    this.myform.patchValue({
      userdata: res.data.userdata,
      education: res.data.education,
      project: res.data.project,
      experience: res.data.experience,
      skill:res.data.skill
    })
    
  }, err=>{
    console.log(err);
    
  })
 
}



  saveResumeData() {
    console.log('Saving form DATA');
    let finalData = this.myform.value;
    console.log("my final data");
 
    console.log(finalData);
    this.dataservice.addResume(finalData).subscribe((respo: any) => {
      this.disableSubmit = false;
      console.log('New resume aded response');
      console.log(respo);
      console.log('emitting to refrest available resume');
  
     
      this.router.navigate(['all']);
    });
    console.log("data is:");
    console.log(finalData); 
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










