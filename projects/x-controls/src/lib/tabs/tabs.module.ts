import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XTabs } from './tabs';
import { XTab } from './tab';
import { XTabHeaderDirective } from './tab-header.directive';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [XTabs, XTab, XTabHeaderDirective],
    exports: [XTabs, XTab, XTabHeaderDirective]
})
export class XTabsModule { }
