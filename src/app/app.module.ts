import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './sample/button/button.component';
import { CheckboxComponent } from './sample/checkbox/checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XButtonModule, XCheckboxModule, XRadioButtonModule, XInputModule, XTabsModule } from 'projects/x-controls/src';
import { RadioButtonComponent } from './sample/radio-button/radio-button.component';
import { InputComponent } from './sample/input/input.component';
import { TabsComponent } from './sample/tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    CheckboxComponent,
    RadioButtonComponent,
    InputComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    XButtonModule,
    XCheckboxModule,
    XRadioButtonModule,
    XInputModule,
    XTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
