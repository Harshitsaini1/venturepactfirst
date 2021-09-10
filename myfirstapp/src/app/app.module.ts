import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule, routingComponents  } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ResumeComponent } from './resume/resume.component';
import { FormComponent } from './resume/form/form.component';
import { DisplayComponent } from './resume/display/display.component';
import { PlaceholderDirectiveDirective } from './placeholder-directive.directive';



//  import { ServerComponent } from './server/server.component';
// import { ServersComponent } from './servers/servers.component';
// import { LoginComponent } from './login/login.component';
// import { ProfileComponent } from './profile/profile.component';
// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    
    routingComponents,
         ResumeComponent,
         FormComponent,
         DisplayComponent,
         PlaceholderDirectiveDirective
         
         
        
        //  HomeComponent,
    // ProfileComponent,
    // HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
   
  
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
