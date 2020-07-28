import { Component, OnInit, Input, ElementRef, TemplateRef, ViewContainerRef, Output, EventEmitter, ContentChild, forwardRef } from '@angular/core';
import { OverlayRef, Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { OverlayService } from '../common';
import { XSelectItemDirective } from './select-item.directive';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * TODO: 1. scroll down show search input;
 *       2. support multiple select;
 */
@Component({
  selector: `x-select`,
  templateUrl: 'select.html',
  styleUrls: ['select.scss'],
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

  @ContentChild(XSelectItemDirective) xSelectItemRef: XSelectItemDirective;

  private overlayRef: OverlayRef;
  private withPositions: any = {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetX: 0,
    offsetY: 0
  };
  private originXItems: Array<XSelectItem> = [];
  private searchToken: string;

  //#region Getter
  get selectedLabel() {
    this.checkItemExists();

    if (this.xSettings.single) {
      return this.xSelectedItem ? (this.xSelectedItem as XSelectItem).label : this.xSettings.placeHolder;
    }

    return 'TODO: multiple select';
  }

  get isDropdownOpen() {
    return this.overlayService.isAttached();
  }

  get isItemSelected() {
    return this.selectedLabel !== this.xSettings.placeHolder;
  }
  //#endregion

  constructor(private viewContainerRef: ViewContainerRef,
    private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges() {

  }

  onSelect(item: XSelectItem) {
    if (this.xSettings.single) {
      this.xSelectedItem = item;
      this.onSelected.emit(item);
      this.emitChange(item);

      this.overlayService.close({ item: item });
      return;
    }

    // TODO: multiple select
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
      // close
    });
  }

  onRemoveItems($event: MouseEvent) {
    this.xSelectedItem = null;
    this.clearSearch();

    $event.stopPropagation();
  }

  //#region Implementation for ControlValueAccessor
  writeValue(obj: any): void {
    if (obj === null) {
      return;
    }

    this.xSelectedItem = obj;
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
      id: 'id',
      label: 'name',
      single: true,
      placeHolder: '请选择',
      width: 220
    };

    this.xSettings = Object.assign(initSettings, this.xSettings);
  }

  private checkItemExists() {
    if (this.xSettings.single) {
      if (this.xSelectedItem && !this.originXItems.find(f => f.id === (this.xSelectedItem as XSelectItem).id)) {
        this.xSelectedItem = null;
      }
    } else {
      // TODO: multiple select
    }
  }

  private clearSearch() {
    this.searchToken = '';
    this.xItems = this.originXItems;
  }
  //#endregion
}

export interface XSelectSettings {
  /**Property name for id, default is 'id' */
  id?: string;

  /**Property name for label, default is 'name' */
  label?: string;

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
}

export interface XSelectItem {
  id: string | number;
  label: string;
  [key: string]: any;
}


