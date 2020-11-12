import { Component, OnInit } from '@angular/core';
import { XDropdownSettings, XDropdownItem } from 'projects/x-controls/src';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  xItems: Array<XDropdownItem> = [];
  xSettings: XDropdownSettings = { lblName: '门店单选', single: true, width: 320 };
  xSelectedItem: XDropdownItem;

  xItems_m: Array<XDropdownItem> = [];
  xSettings_m: XDropdownSettings = { lblName: '城市多选', single: false, width: 320, badge: 3, isShowCheckedAll: true };
  xSelectedItem_m: Array<XDropdownItem> = [];

  formGroup: FormGroup;
  xItems_m_form: Array<XDropdownItem> = [];

  get f() {
    return this.formGroup.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //#region NgModel
    let results: Array<XDropdownItem> = [];
    for (let i = 0; i < 10000; i++) {
      results.push({ id: '#' + i, label: '门店#' + i, hah: 'hah#' + i });
    }

    this.xItems = results;
    this.xSelectedItem = this.xItems[100];

    // Multiple select
    let results_m: Array<XDropdownItem> = [];
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
