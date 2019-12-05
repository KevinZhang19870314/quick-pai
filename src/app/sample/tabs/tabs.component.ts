import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  selectedIndex = 1;
  banana = '香蕉';
  isVisible = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
    }, 2000);
  }

  gotoAllActivity() {
    this.selectedIndex = 0;
  }
}
