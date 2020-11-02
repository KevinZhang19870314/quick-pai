import { Directive, ContentChild, TemplateRef, Input } from '@angular/core';

/**
 * @ignore
 */
@Directive({ selector: 'x-tab-header' })
export class XTabHeaderDirective {
    @Input() name: string;
    @ContentChild(TemplateRef, { static: true }) template: TemplateRef<any>;

    constructor() { }
}