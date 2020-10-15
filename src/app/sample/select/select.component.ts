import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { XSelectSettings, XSelectItem } from 'projects/x-controls/src';
import { Utils } from 'projects/x-controls/src/lib/common/utils';
import { FormGroup, FormBuilder } from '@angular/forms';
import { XSelectItemDirective } from 'projects/x-controls/src/lib/select/select-item.directive';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  xItems: Array<XSelectItem> = [];
  xSettings: XSelectSettings = { lblName: '门店单选', single: true, width: 320 };
  xSelectedItem: XSelectItem;

  xItems_m: Array<XSelectItem> = [];
  xSettings_m: XSelectSettings = { lblName: '城市多选', single: false, width: 320, badge: 3, isShowCheckedAll: true };
  xSelectedItem_m: Array<XSelectItem>;

  formGroup: FormGroup;
  xItems_m_form: Array<XSelectItem> = [];

  get f() {
    return this.formGroup.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //#region NgModel
    let results: Array<XSelectItem> = [];
    for (let i = 0; i < 10000; i++) {
      results.push({ id: '#' + i, label: '门店#' + i, hah: 'hah#' + i });
    }

    this.xItems = results;
    this.xSelectedItem = this.xItems[100];

    // Multiple select
    let results_m: Array<XSelectItem> = [];
    for (let i = 0; i < 10000; i++) {
      results_m.push({ id: '#' + i, label: '城市#' + i, hah: 'hah#' + i });
    }

    this.xItems_m = results_m;
    this.xSelectedItem_m = [JSON.parse(JSON.stringify(this.xItems_m[0])), this.xItems_m[2], this.xItems_m[1]];
    //#endregion

    //#region Reactive forms
    let results_m_form = [];
    for (let i = 0; i < 10000; i++) {
      results_m_form.push({ id: '#' + i, label: '城市#' + i, hah: 'hah#' + i });
    }

    this.xItems_m_form = [...results_m_form];
    this.formGroup = this.fb.group({
      single: [this.xItems[99], []],
      multiple: [[JSON.parse(JSON.stringify(this.xItems_m_form[1])), this.xItems_m_form[999]], []]
    });
    //#endregion
  }

  onSelected($event) {
    console.log($event);
  }

  onSelected_m($event) {
    console.log('onSelected_m', $event);
  }
}
