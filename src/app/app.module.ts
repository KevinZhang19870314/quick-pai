import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XControlsModule, XButtonModule } from 'projects/x-controls/src';
import { ButtonComponent } from './sample/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    XControlsModule,
    XButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
