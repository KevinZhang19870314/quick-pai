import { Component, OnInit, Input, ElementRef, TemplateRef, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { OverlayRef, Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { OverlayService } from '../common';

@Component({
  selector: `x-select`,
  templateUrl: 'select.html',
  styleUrls: ['select.scss'],
  host: {
    '[class.disabled]': 'xDisabled === "true" || xDisabled === true'
  }
})

export class XSelect implements OnInit {

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
  get label() {
    if (this.xSettings.single) {
      return this.xSelectedItem ? (this.xSelectedItem as XSelectItem).label : this.xSettings.placeHolder;
    }

    return 'TODO: multiple select';
  }

  get isDropdownOpen() {
    return this.overlayService.isAttached();
  }

  get isItemSelected() {
    return this.label !== this.xSettings.placeHolder;
  }
  //#endregion

  constructor(private viewContainerRef: ViewContainerRef,
    private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.initSettings();
    this.originXItems = [...this.xItems];
  }

  ngOnChanges() {

  }

  onSelect(item: XSelectItem) {
    if (this.xSettings.single) {
      this.xSelectedItem = item;
      this.onSelected.emit(item);
      this.overlayService.close({ item: item });
      return;
    }

    // TODO: multiple select
  }

  onSearch(val: any) {
    if (!val) {
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

  //#region Private methods
  private initSettings() {
    this.xSettings = {
      id: 'id',
      label: 'name',
      single: true,
      placeHolder: 'Please select'
    }
  }
  //#endregion
}

export interface XSelectSettings {
  /**Property name for id, default is 'id' */
  id?: string;

  /**Property name for label, default is 'name' */
  label?: string;

  /**Set if it is single select, default is true - single select */
  single?: boolean;

  /**Placeholder for select */
  placeHolder?: string;
}

export interface XSelectItem {
  id: string | number;
  label: string;
  [key: string]: any;
}


