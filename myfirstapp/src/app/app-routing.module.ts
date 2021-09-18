import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
// import { ResumeComponent } from './resume/resume.component';
import { FormComponent } from './resume/form/form.component';
import { DisplayComponent } from './resume/display/display.component';


const routes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'signup',  component: SignupComponent},
  { path: 'login',  component: LoginComponent},
  { path: 'profile',  component: ProfileComponent},
  {path: 'resume', component: FormComponent},
  {path: 'display', component: DisplayComponent}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignupComponent, LoginComponent,ProfileComponent, HomeComponent, FormComponent, DisplayComponent] 
