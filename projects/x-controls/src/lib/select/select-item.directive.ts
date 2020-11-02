import { Directive, ContentChild, TemplateRef } from '@angular/core';

/**xItems directive - used for customize each items in the dropdown */
@Directive({ selector: 'x-select-item' })
export class XSelectItemDirective {
    @ContentChild(TemplateRef, { static: true }) template: TemplateRef<any>;

    constructor() { }
}