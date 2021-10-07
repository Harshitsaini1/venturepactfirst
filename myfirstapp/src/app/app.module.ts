import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents  } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './resume/form/form.component';
import { DisplayComponent } from './resume/display/display.component';
import { PlaceholderDirectiveDirective } from './placeholder-directive.directive';
import { AuthInceptorService } from './service/auth-inceptor.service';
import { TemplateComponent } from './resume/template/template.component';
import { MultitemplateComponent } from './resume/multitemplate/multitemplate.component';
import { FirstComponent } from './first/first.component';




@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    
    routingComponents,
       
         FormComponent,
         DisplayComponent,
         PlaceholderDirectiveDirective,
         TemplateComponent,
         MultitemplateComponent,
         FirstComponent,
        
        
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    
   
  
  ],
  providers:[
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInceptorService,
      multi: true,
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
