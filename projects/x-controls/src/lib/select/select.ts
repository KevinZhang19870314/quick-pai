import { Component, OnInit, Input, ElementRef, TemplateRef, ViewContainerRef, Output, EventEmitter, ContentChild, forwardRef, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { OverlayRef, Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { OverlayService } from '../common';
import { XSelectItemDirective } from './select-item.directive';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { trigger, state, style, transition, animate, query, stagger, group } from '@angular/animations';

/**
 * 下拉选择组件 - 支持单选和多选功能
 */
@Component({
  selector: `x-select`,
  templateUrl: 'select.html',
  styleUrls: ['select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.disabled]': 'xDisabled === "true" || xDisabled === true'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => XSelect),
      multi: true,
    }]
})
export class XSelect implements OnInit, ControlValueAccessor {
  private emitChange = (_: any) => { };

  /**Set the select control is disabled or not */
  @Input() xDisabled: any = false;

  /**Settings for select, like property name for id, label and etc. */
  @Input() xSettings: XSelectSettings;

  /**Dropdown items for select control */
  @Input() xItems: Array<XSelectItem> = [];

  /**Selected item or items for select control */
  @Input() xSelectedItem: XSelectItem | Array<XSelectItem>;

  /**Trigger after item selected */
  @Output() onSelected = new EventEmitter<XSelectItem | Array<XSelectItem>>();
  /**取消选择时触发 */
  @Output() onDeselected = new EventEmitter<XSelectItem | Array<XSelectItem>>();
  /**全选时触发 */
  @Output() onSelectedAll = new EventEmitter<XSelectItem | Array<XSelectItem>>();
  /**取消全选时触发 */
  @Output() onDeselectedAll = new EventEmitter<XSelectItem | Array<XSelectItem>>();

  @ContentChild(XSelectItemDirective) xSelectItemRef: XSelectItemDirective;

  private originXItems: Array<XSelectItem> = [];
  /**Search text binding */
  private searchToken: string;

  //#region Getter
  /**For single select */
  get selectedLabel() {
    this.checkItemExists();

    if (this.xSettings.single) {
      return this.xSelectedItem ? (this.xSelectedItem as XSelectItem).label : this.xSettings.placeHolder;
    }

    return this.xSettings.placeHolder;
  }

  /**For multiple select */
  selectedItems: Array<XSelectItem> = [];
  selectedBadgeItems: Array<XSelectItem> = [];
  noneBadgeCount: number = 0;

  private buildMultipleSelect() {
    if (this.xSettings.single) {
      return;
    }

    //#region selectedItems
    this.checkItemExists();
    let selectedItems = this.xSelectedItem as Array<XSelectItem>;
    if (selectedItems && selectedItems.length > 0) {
      this.selectedItems = [...selectedItems];
    } else {
      this.selectedItems = [{ id: -1, label: this.xSettings.placeHolder }];
    }
    //#endregion

    //#region selectedBadgeItems
    let items = [...this.selectedItems];
    items.splice(this.xSettings.badge);
    this.selectedBadgeItems = items;
    //#endregion

    this.noneBadgeCount = this.selectedItems.length - this.xSettings.badge;

    this.cdf.detectChanges();
  }

  get isDropdownOpen() {
    return this.overlayService.isAttached();
  }

  get isItemSelected() {
    if (this.xSettings.single) {
      return this.selectedLabel !== this.xSettings.placeHolder;
    }

    // Multiple select
    if (this.selectedItems && this.selectedItems.length > 0) {
      return this.selectedItems[0].label !== this.xSettings.placeHolder;
    }

    return false;
  }

  get isCheckedAll() {
    return this.xItems.length === this.xSelectedItem.length;
  }
  //#endregion

  constructor(private viewContainerRef: ViewContainerRef,
    private overlayService: OverlayService,
    private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) { }

  onSelectAll(checked: boolean) {
    this.xItems.forEach(item => {
      item.checked = checked;
    });

    this.xSelectedItem = checked ? [...this.xItems] : [];
    this.buildMultipleSelect();
    this.onSelectedAll.emit(this.xSelectedItem);
    this.emitChange(this.xSelectedItem);
  }

  onSelect(item: XSelectItem) {
    if (this.xSettings.single) {
      this.xSelectedItem = item;
      this.onSelected.emit(item);
      this.emitChange(item);

      this.overlayService.close({ item: item });
      return;
    }

    //#region Multiple select
    if (!this.xSelectedItem || !this.xSelectedItem.length) {
      this.xSelectedItem = [];
    }

    if (item.checked) {
      this.xSelectedItem.push(item);
    } else {
      this.xSelectedItem = this.xSelectedItem.filter((f: XSelectItem) => f.id !== item.id);
    }

    this.buildMultipleSelect();
    this.onSelected.emit(item);
    this.emitChange(this.xSelectedItem);
    //#endregion
  }

  onSearch(val: any) {
    if (!val) {
      this.clearSearch();
      return;
    }

    this.xItems = this.originXItems.filter(f => f.label.indexOf(val) > -1);
  }

  isActive(item: XSelectItem) {
    if (!this.xSelectedItem) {
      return false;
    }

    return item.id === (this.xSelectedItem as XSelectItem).id;

    // TODO: multiple select
  }

  onOpenDropdown($event: MouseEvent, dropdownTpl: TemplateRef<any>, origin: HTMLElement) {
    $event.stopPropagation();

    if (this.isDropdownOpen) {
      this.overlayService.close(null);
      return;
    }

    this.overlayService.openDropdown(origin, dropdownTpl, this.viewContainerRef, null).subscribe(res => {
      this.buildXItemsCheckedStatus();
    });
  }

  onRemoveItems($event: MouseEvent) {
    this.xSelectedItem = [];
    this.clearSearch();
    this.xItems.forEach(item => {
      item.checked = false;
    });

    this.buildMultipleSelect();
    this.onDeselectedAll.emit(this.xItems);
    this.emitChange(this.xSelectedItem);
    $event.stopPropagation();
  }

  onRemoveItem($event: MouseEvent, item: XSelectItem) {
    this.xSelectedItem = this.xSelectedItem.filter((f: XSelectItem) => f.id !== item.id);
    this.clearSearch();

    item.checked = false;

    this.buildMultipleSelect();
    this.onDeselected.emit(item);
    this.emitChange(this.xSelectedItem);
    $event.stopPropagation();
  }

  //#region Implementation for ControlValueAccessor
  writeValue(obj: any): void {
    if (obj === null) {
      return;
    }

    this.xSelectedItem = obj;
    if (!this.xSettings.single) {
      this.xSelectedItem.forEach(item => {
        if (item.checked === undefined) {
          item.checked = true;
        }
      });
      this.buildMultipleSelect();
    }
  }

  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  registerOnTouched(fn: any): void { }
  //#endregion

  //#region Private methods
  private init() {
    this.originXItems = [...this.xItems];
    let initSettings: XSelectSettings = {
      single: true,
      placeHolder: '请选择',
      width: 220,
      badge: 99999
    };

    this.xSettings = Object.assign(initSettings, this.xSettings);
    this.buildMultipleSelect();
  }

  private checkItemExists() {
    if (this.xSettings.single) {
      if (this.xSelectedItem && !this.originXItems.find(f => f.id === (this.xSelectedItem as XSelectItem).id)) {
        this.xSelectedItem = null;
      }
    } else {
      // Multiple select
      if (this.xSelectedItem && this.xSelectedItem.length > 0) {
        let selectedItems = [];
        this.xSelectedItem.forEach((item: XSelectItem) => {
          if (this.originXItems.find(f => f.id === item.id)) {
            selectedItems.push(item);
          }
        });

        this.xSelectedItem = [];
        this.xSelectedItem = selectedItems;
      }
    }
  }

  /**
   * 清除查询并展示所有符合条件的items
   */
  private clearSearch() {
    this.searchToken = '';
    this.xItems = [...this.originXItems];

    this.buildXItemsCheckedStatus();
  }

  private buildXItemsCheckedStatus() {
    if (this.xSettings.single) {
      return;
    }

    this.xItems.forEach(item => {
      let selectedItem = this.xSelectedItem.find(f => f.id === item.id);
      item.checked = selectedItem ? true : false;
    });
  }
  //#endregion
}

export interface XSelectSettings {
  /**Left side label name */
  lblName?: string;

  /**Set if it is single select, default is true - single select */
  single?: boolean;

  /**Check if it is required. if not, show remove icon, otherwise hide the remove icon */
  isRequired?: boolean;

  /**Placeholder for select */
  placeHolder?: string;

  /**Set the width of x-select, default is 220, unit px */
  width?: number;

  /**Display badge count, default is 99999 */
  badge?: number;

  /**是否展示全选按钮 */
  isShowCheckedAll?: boolean;

  /**是否默认全选 */
  isCheckedAll?: boolean;
}

export interface XSelectItem {
  id: string | number;
  label: string;
  [key: string]: any;
}


