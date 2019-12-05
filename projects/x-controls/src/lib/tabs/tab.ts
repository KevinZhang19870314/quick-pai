import { Component, OnInit, Input, ContentChild, TemplateRef, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { XTabHeaderDirective } from './tab-header.directive';
import { NotifyService, TAB_xVisible } from '../common/notify.service';

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

  constructor(private notifyService: NotifyService) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.xVisible && !changes.xVisible.firstChange) {
      this.notifyService.notify(TAB_xVisible, { tab: this, xVisible: changes.xVisible.currentValue });
    }
  }
}


