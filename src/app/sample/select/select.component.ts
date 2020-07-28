import { Component, OnInit } from '@angular/core';
import { XSelectSettings, XSelectItem } from 'projects/x-controls/src';
import { Utils } from 'projects/x-controls/src/lib/common/utils';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  xItems: Array<XSelectItem>;
  xSettings: XSelectSettings = { lblName: '门店选择', single: true, width: 320 };
  xSelectedItem: XSelectItem;

  constructor() { }

  ngOnInit() {
    let results: Array<XSelectItem> = [];
    for (let i = 0; i < 1000; i++) {
      results.push({ id: '#' + i, label: '门店#' + i, hah: 'hah#' + i });
    }

    this.xItems = results;
    this.xSelectedItem = this.xItems[100];
  }

  onSelected($event) {
    console.log($event);
  }
}
