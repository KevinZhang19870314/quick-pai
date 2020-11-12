import { Component, OnInit, Input, ElementRef, TemplateRef, ViewContainerRef, Output, EventEmitter, ContentChild, forwardRef, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { XDropdownItemDirective } from './dropdown-item.directive';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { OverlayService } from '../common/overlay.service';

/**
 * 下拉选择组件 - 支持单选和多选功能
 *
 */
@Component({
  selector: `x-dropdown`,
  templateUrl: 'dropdown.html',
  styleUrls: ['dropdown.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.disabled]': 'xDisabled === "true" || xDisabled === true'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => XDropdown),
      multi: true,
    }]
})
export class XDropdown implements OnInit, ControlValueAccessor {
  private emitChange = (_: any) => { };

  /**是否禁用状态 */
  @Input() xDisabled: any = false;

  /**下拉组件的基础设置，如是否单选等 */
  @Input() xSettings: XDropdownSettings;

  /**全部下拉选项 */
  @Input() xItems: Array<XDropdownItem> = [];

  /**已选项 - 单选为一个对象， 多选则为一组数组 */
  @Input() xSelectedItem: XDropdownItem | Array<XDropdownItem>;

  /**选择时触发 */
  @Output() onSelected = new EventEmitter<XDropdownItem | Array<XDropdownItem>>();
  /**取消选择时触发 */
  @Output() onDeselected = new EventEmitter<XDropdownItem | Array<XDropdownItem>>();
  /**全选时触发 */
  @Output() onSelectedAll = new EventEmitter<XDropdownItem | Array<XDropdownItem>>();
  /**取消全选时触发 */
  @Output() onDeselectedAll = new EventEmitter<XDropdownItem | Array<XDropdownItem>>();

  @ContentChild(XDropdownItemDirective) selectItemRef: XDropdownItemDirective;

  private originXItems: Array<XDropdownItem> = [];
  /**查询Token */
  searchToken: string;

  //#region Getter
  /**单选下拉框 */
  get selectedLabel() {
    this.checkItemExists();

    if (this.xSettings.single) {
      return this.xSelectedItem ? (this.xSelectedItem as XDropdownItem).label : this.xSettings.placeHolder;
    }

    return this.xSettings.placeHolder;
  }

  /**多选下拉框 */
  selectedItems: Array<XDropdownItem> = [];
  selectedBadgeItems: Array<XDropdownItem> = [];
  noneBadgeCount: number = 0;

  private buildMultipleSelect() {
    if (this.xSettings.single) {
      return;
    }

    //#region selectedItems
    this.checkItemExists();
    let selectedItems = this.xSelectedItem as Array<XDropdownItem>;
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

    // Multiple dropdown
    if (this.selectedItems && this.selectedItems.length > 0) {
      return this.selectedItems[0].label !== this.xSettings.placeHolder;
    }

    return false;
  }

  _isCheckedAll: boolean = false;
  get isCheckedAll() {
    return this.xItems.length === this.xSelectedItem.length;
  }

  set isCheckedAll(val: boolean) {
    this._isCheckedAll = val;
  }
  //#endregion

  constructor(private viewContainerRef: ViewContainerRef,
    private overlayService: OverlayService,
    private cdf: ChangeDetectorRef,
    private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    let items = changes['items'];
    if (items && items.currentValue && items.currentValue.length >= 0) {
      this.originXItems = [...items.currentValue];
    }
  }

  onSelectAll(checked: boolean) {
    this.xItems.forEach(item => {
      item.checked = checked;
    });

    this.xSelectedItem = checked ? [...this.xItems] : [];
    this.buildMultipleSelect();
    this.onSelectedAll.emit(this.xSelectedItem);
    this.emitChange(this.xSelectedItem);
  }

  onSelect(item: XDropdownItem) {
    if (this.xSettings.single) {
      this.xSelectedItem = item;
      this.onSelected.emit(item);
      this.emitChange(item);
      this.cdf.detectChanges();

      this.overlayService.close({ item: item });
      return;
    }

    //#region Multiple dropdown
    if (!this.xSelectedItem || !this.xSelectedItem.length) {
      this.xSelectedItem = [];
    }

    if (item.checked) {
      this.xSelectedItem.push(item);
    } else {
      this.xSelectedItem = this.xSelectedItem.filter((f: XDropdownItem) => f.id !== item.id);
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

  isActive(item: XDropdownItem) {
    if (!this.xSelectedItem) {
      return false;
    }

    if (this.xSettings.single) {
      return item.id === (this.xSelectedItem as XDropdownItem).id;
    }

    // Multiple dropdown
    return this.xSelectedItem.find(f => f.id === item.id);
  }

  onOpenDropdown($event: MouseEvent, dropdownTpl: TemplateRef<any>, origin: HTMLElement) {
    $event.stopPropagation();

    if (this.isDropdownOpen) {
      this.overlayService.close(null);
      return;
    }

    this.overlayService.openDropdown(origin, dropdownTpl, this.viewContainerRef, null).subscribe(() => {
      // close
    });

    this.buildXItemsCheckedStatus();

    // Tricky... Can't get inner element in x-input control, so we need set
    // style async after open dropdown
    setTimeout(() => {
      if (!this.overlayService.overlayRef || !this.overlayService.overlayRef.overlayElement) {
        return;
      }

      let xInputWrapper = this.overlayService.overlayRef.overlayElement.getElementsByClassName('x-input-wrapper');
      let inputContainer = this.overlayService.overlayRef.overlayElement.getElementsByClassName('input-container');
      let xInput = this.overlayService.overlayRef.overlayElement.getElementsByClassName('x-input');
      if (xInputWrapper && xInputWrapper.length > 0) {
        this.renderer2.setStyle(xInputWrapper[0], 'width', '100%');
      }

      if (inputContainer && inputContainer.length > 0) {
        this.renderer2.setStyle(inputContainer[0], 'width', '100%');
      }

      if (xInput && xInput.length > 0) {
        this.renderer2.setStyle(xInput[0], 'width', this.xSettings.width + 'px');
        this.renderer2.setStyle(xInput[0], 'padding-left', '30px');
        this.renderer2.setStyle(xInput[0], 'border-top', 'none');
        this.renderer2.setStyle(xInput[0], 'border-left', 'none');
        this.renderer2.setStyle(xInput[0], 'border-right', 'none');
        this.renderer2.setStyle(xInput[0], 'box-shadow', 'none');
      }
    }, 0);
  }

  onRemoveItems($event: MouseEvent) {
    this.xSelectedItem = this.xSettings.single ? null : [];
    this.clearSearch();
    this.xItems.forEach(item => {
      item.checked = false;
    });

    this.buildMultipleSelect();
    this.onDeselectedAll.emit(this.xItems);
    this.emitChange(this.xSelectedItem);
    $event.stopPropagation();
  }

  onRemoveItem($event: MouseEvent, item: XDropdownItem) {
    this.xSelectedItem = this.xSelectedItem.filter((f: XDropdownItem) => f.id !== item.id);
    this.clearSearch();

    item.checked = false;

    this.buildMultipleSelect();
    this.onDeselected.emit(item);
    this.emitChange(this.xSelectedItem);
    $event.stopPropagation();
  }

  //#region Implementation for ControlValueAccessor
  writeValue(obj: any): void {
    // 如果是多选下拉框，传入的selectedItem是null，为了防止报错直接return，必须传入空数组[]
    if (obj === null && !this.xSettings.single) {
      return;
    }

    this.xSelectedItem = obj;
    if (this.xSettings.single) {
      this.cdf.detectChanges();
    } else {
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
    let initSettings: XDropdownSettings = {
      single: true,
      placeHolder: '请选择',
      width: 220,
      badge: 99999,
      isShowSearchBox: true,
      noData: '没有数据！'
    };

    this.xSettings = Object.assign(initSettings, this.xSettings);
  }

  private checkItemExists() {
    if (this.xSettings.single) {
      if (this.xSelectedItem && !this.originXItems.find(f => f.id === (this.xSelectedItem as XDropdownItem).id)) {
        this.xSelectedItem = null;
      }
    } else {
      // Multiple dropdown
      if (this.xSelectedItem && this.xSelectedItem.length > 0) {
        let selectedItems = [];
        this.xSelectedItem.forEach((item: XDropdownItem) => {
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

export interface XDropdownSettings {
  /**左侧标签名称 */
  lblName?: string;

  /**是否单选下拉框，默认为true - 单选下拉框 */
  single?: boolean;

  /**是否必填，如果为false，右侧展示删除icon */
  isRequired?: boolean;

  /**占位符 */
  placeHolder?: string;

  /**下拉框的宽度, 默认为220px */
  width?: number;

  /**显示项目盒子, 默认为99999 */
  badge?: number;

  /**是否展示全选按钮 */
  isShowCheckedAll?: boolean;

  /**是否默认全选 */
  isCheckedAll?: boolean;

  /**没有数据时展示的文案，默认为‘没有数据！’ */
  noData?: string;

  /**是否显示搜索框，默认展示 */
  isShowSearchBox?: boolean;
}

export interface XDropdownItem {
  id: string | number;
  label: string;
  [key: string]: any;
}