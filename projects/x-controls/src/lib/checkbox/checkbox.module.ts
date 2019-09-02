import { NgModule } from '@angular/core';
import { XCheckbox } from './checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [XCheckbox],
    exports: [XCheckbox]
})
export class XCheckboxModule { }
