import { Directive, ContentChild, TemplateRef } from '@angular/core';

/**Dropdown items directive - used for customize each items in the dropdown */
@Directive({ selector: 'x-dropdown-item' })
export class XDropdownItemDirective {
    @ContentChild(TemplateRef) template: TemplateRef<any>;

    constructor() { }
}