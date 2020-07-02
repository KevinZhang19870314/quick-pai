import { Directive, ContentChild, TemplateRef, Input } from '@angular/core';

/**
 * @ignore
 */
@Directive({ selector: 'x-tab-header' })
export class XTabHeaderDirective {
    @Input() name: string;
    @ContentChild(TemplateRef) template: TemplateRef<any>;

    constructor() { }
}