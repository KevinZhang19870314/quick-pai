import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSelect } from './select';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { XInputModule } from '../input';
import { FormsModule } from '@angular/forms';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ScrollDispatchModule,
        XInputModule
    ],
    declarations: [XSelect],
    exports: [XSelect]
})
export class XSelectModule { }
