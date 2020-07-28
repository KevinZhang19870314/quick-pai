import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSelect } from './select';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { XInputModule } from '../input';
import { FormsModule } from '@angular/forms';
import { XSelectItemDirective } from './select-item.directive';
import { XCheckboxModule } from 'x-controls';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ScrollDispatchModule,
        XInputModule,
        XCheckboxModule
    ],
    declarations: [XSelect, XSelectItemDirective],
    exports: [XSelect, XSelectItemDirective]
})
export class XSelectModule { }
