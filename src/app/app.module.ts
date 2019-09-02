import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XControlsModule, XButtonModule } from 'projects/x-controls/src';
import { ButtonComponent } from './sample/button/button.component';
import { XCheckboxModule } from 'projects/x-controls/src/lib/checkbox';
import { CheckboxComponent } from './sample/checkbox/checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    CheckboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    XControlsModule,
    XButtonModule,
    XCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
