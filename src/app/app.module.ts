import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './sample/button/button.component';
import { CheckboxComponent } from './sample/checkbox/checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  XButtonModule,
  XCheckboxModule,
  XRadioButtonModule,
  XInputModule,
  XTabsModule,
  XTooltipModule,
  XDropdownModule,
  XSideNavModule
} from 'projects/x-controls/src';
import { RadioButtonComponent } from './sample/radio-button/radio-button.component';
import { InputComponent } from './sample/input/input.component';
import { TabsComponent } from './sample/tabs/tabs.component';
import { TooltipComponent } from './sample/tooltip/tooltip.component';
import { DropdownComponent } from './sample/dropdown/dropdown.component';
import { SideNavComponent } from './sample/sidenav/sidenav.component';
import { HomeComponent } from './sample/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    CheckboxComponent,
    RadioButtonComponent,
    InputComponent,
    TabsComponent,
    TooltipComponent,
    DropdownComponent,
    SideNavComponent
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
    XTabsModule,
    XTooltipModule,
    XDropdownModule,
    XSideNavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
