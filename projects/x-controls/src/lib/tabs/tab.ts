import { Component, OnInit, Input, ContentChild, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { XTabHeaderDirective } from './tab-header.directive';

@Component({
  selector: `x-tab`,
  templateUrl: 'tab.html',
  styleUrls: ['tab.scss']
})

export class XTab implements OnInit {

  @ViewChild(TemplateRef) content: TemplateRef<any>;
  @ContentChild(XTabHeaderDirective) tabHeaderContent: XTabHeaderDirective;

  @Input() xTitle: string;
  @Input() xDisabled: boolean = false;
  @Input() xVisible: boolean = true;

  isActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
  }

  ngOnChanges() {

  }
}


