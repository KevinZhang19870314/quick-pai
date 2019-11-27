import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  selectedIndex = 1;
  banana = '香蕉';
  constructor() { }

  ngOnInit() {
  }

  gotoAllActivity() {
    this.selectedIndex = 0;
  }
}
