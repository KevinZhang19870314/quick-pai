import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSideNav } from './sidenav';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [XSideNav],
    exports: [XSideNav]
})
export class XSideNavModule { }
