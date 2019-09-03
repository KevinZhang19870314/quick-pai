import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XRadioButton, XRadioButtonGroup } from './radio-button';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [XRadioButton, XRadioButtonGroup],
    exports: [XRadioButton, XRadioButtonGroup]
})
export class XRadioButtonModule { }
