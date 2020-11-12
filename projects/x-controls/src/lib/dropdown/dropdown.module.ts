import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XDropdown } from './dropdown';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { XInputModule } from '../input/index';
import { FormsModule } from '@angular/forms';
import { XDropdownItemDirective } from './dropdown-item.directive';
import { XCheckboxModule } from '../checkbox/index';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ScrollingModule,
        XInputModule,
        XCheckboxModule
    ],
    declarations: [XDropdown, XDropdownItemDirective],
    exports: [XDropdown, XDropdownItemDirective]
})
export class XDropdownModule { }
