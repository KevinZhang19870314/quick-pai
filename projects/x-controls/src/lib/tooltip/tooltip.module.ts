import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XCommonModule } from '../common';
import { XTooltipDirective, XTooltipComponent } from './tooltip';

/**
 * @ignore
 */
@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        BrowserAnimationsModule,
        XCommonModule
    ],
    declarations: [XTooltipDirective, XTooltipComponent],
    exports: [XTooltipDirective, XTooltipComponent],
    entryComponents: [
        XTooltipComponent
    ]
})
export class XTooltipModule { }
