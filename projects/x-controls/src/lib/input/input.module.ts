import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XInput } from './input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [XInput],
    exports: [XInput]
})
export class XInputModule { }
