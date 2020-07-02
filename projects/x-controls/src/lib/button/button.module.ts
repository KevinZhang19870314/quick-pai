import { NgModule } from '@angular/core';
import { XButton } from './button';
import { CommonModule } from '@angular/common';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [XButton],
    exports: [XButton]
})
export class XButtonModule { }
