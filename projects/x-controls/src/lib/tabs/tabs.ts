import { Component, OnInit, Renderer2, ElementRef, SimpleChanges, Input, Output, EventEmitter, forwardRef, ContentChildren, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { XTab } from './tab';

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

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.xSelectedIndex = +this.xSelectedIndex;
    this.tabsArray = this.allTabs.toArray().filter(f => f.xVisible);
    if (this.tabsArray && this.tabsArray.length > 0) {
      this.activeTab = this.tabsArray[this.xSelectedIndex] ? this.tabsArray[this.xSelectedIndex] : this.tabsArray[0];
    }
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

  // writeValue(obj: any): void {
  //   throw new Error("Method not implemented.");
  // }

  // registerOnChange(fn: any): void {
  //   this.emitChange = fn;
  // }

  // registerOnTouched(fn: any): void { }
}


