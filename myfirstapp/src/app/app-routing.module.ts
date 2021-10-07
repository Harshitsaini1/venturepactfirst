import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { FormComponent } from './resume/form/form.component';
import { DisplayComponent } from './resume/display/display.component';
import { TemplateComponent } from './resume/template/template.component';
import { MultitemplateComponent } from './resume/multitemplate/multitemplate.component';
import { FirstComponent } from './first/first.component';




const routes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'signup',  component: SignupComponent},
  { path: 'login',  component: LoginComponent},
  { path: 'profile',  component: ProfileComponent},
  {path: 'resume', component: FormComponent},
  {path: 'display', component: DisplayComponent},
  {path: 'template', component: TemplateComponent},
  {path: 'all', component:MultitemplateComponent},
  {path:'first', component:FirstComponent}
 
  

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignupComponent, LoginComponent,ProfileComponent,HomeComponent,
 FormComponent, DisplayComponent, TemplateComponent, MultitemplateComponent,FirstComponent] 
