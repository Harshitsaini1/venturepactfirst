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
import { MyformComponent } from './Cv/myform/myform.component';


@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    
    routingComponents,
       
         FormComponent,
         DisplayComponent,
         PlaceholderDirectiveDirective,
         MyformComponent
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
