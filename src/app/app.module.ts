import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XControlsModule } from 'projects/x-controls/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    XControlsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
