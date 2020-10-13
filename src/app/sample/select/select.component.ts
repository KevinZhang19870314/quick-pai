import { Component, OnInit } from '@angular/core';
import { XSelectSettings, XSelectItem } from 'projects/x-controls/src';
import { Utils } from 'projects/x-controls/src/lib/common/utils';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  xItems: Array<XSelectItem> = [];
  xSettings: XSelectSettings = { lblName: '门店选择', single: true, width: 320 };
  xSelectedItem: XSelectItem;

  xItems_m: Array<XSelectItem> = [];
  xSettings_m: XSelectSettings = { lblName: '城市选择', single: false, width: 320, badge: 3 };
  xSelectedItem_m: XSelectItem;

  constructor() { }

  ngOnInit() {
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
  }

  onSelected($event) {
    console.log($event);
  }

  onSelected_m($event) {
    console.log('onSelected_m', $event);
  }
}
