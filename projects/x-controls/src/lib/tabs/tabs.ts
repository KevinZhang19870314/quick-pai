import { Component, OnInit, Renderer2, ElementRef, SimpleChanges, Input, Output, EventEmitter, forwardRef, ContentChildren, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { XTab } from './tab';
import { NotifyService, TAB_xVisible } from '../common/notify.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: `x-tabs`,
  templateUrl: 'tabs.html',
  styleUrls: ['tabs.scss']
})

export class XTabs implements OnInit {

  @Input() xColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() xDisabled: boolean = false;

  /**support two way binding: [(xSelectedIndex)]="selextedIndex" */
  @Input() xSelectedIndex: number = 0;
  @Output() xSelectedIndexChange = new EventEmitter<number>();

  @ContentChildren(forwardRef(() => XTab), { descendants: true })
  allTabs: QueryList<XTab>;

  /**UI binding usage */
  tabsArray: XTab[] = [];
  activeTab: XTab;

  private unsubscribe_xVisible: Subscription = null;

  constructor(private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.unsubscribe_xVisible = this.notifyService.get(TAB_xVisible).subscribe(res => {
      if (res && res.tab) {
        let tab = this.allTabs.find(f => f === res.tab);
        if (tab) {
          tab.xVisible = res.tab.xVisible;
          this.refreshTabs();
        }
      }
    });
  }

  ngAfterContentInit() {
    this.refreshTabs();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.xSelectedIndex && !changes.xSelectedIndex.firstChange) {
      let idx = +changes.xSelectedIndex.currentValue;
      let tab = this.tabsArray[idx];
      if (tab && !tab.xDisabled) {
        this.activeTab = tab;
        this.xSelectedIndexChange.emit(idx);
      }
    }
  }

  onTabHeaderClicked(tab: XTab, i: number) {
    if (tab.xDisabled) {
      return;
    }

    this.xSelectedIndex = i;
    this.activeTab = tab;

    this.xSelectedIndexChange.emit(this.xSelectedIndex);
  }

  ngOnDestroy(): void {
    if (this.unsubscribe_xVisible) {
      this.unsubscribe_xVisible.unsubscribe();
    }
  }

  private refreshTabs() {
    this.xSelectedIndex = +this.xSelectedIndex;
    this.tabsArray = this.allTabs.toArray().filter(f => f.xVisible);
    if (this.tabsArray && this.tabsArray.length > 0) {
      this.activeTab = this.tabsArray[this.xSelectedIndex] ? this.tabsArray[this.xSelectedIndex] : this.tabsArray[0];
    }
  }
}


