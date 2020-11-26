import { Component, OnInit } from '@angular/core';
import { XSideNavItem } from 'projects/x-controls/src';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SideNavComponent implements OnInit {

  items: XSideNavItem[] = [{
    id: 'K67d',
    displayName: '主页',
    iconName: 'fa fa-home',
    route: '/',
    highlightRoutes: ['/'],
    children: []
  }, {
    id: 'HMb0',
    displayName: '组件示例',
    iconName: 'fa fa-flag',
    route: '',
    highlightRoutes: [],
    children: [{
      id: 'wFpY',
      displayName: '按钮',
      route: 'button',
      highlightRoutes: ['button'],
      children: []
    }, {
      id: 'MZ0o',
      displayName: '多选框',
      route: 'checkbox',
      highlightRoutes: ['checkbox'],
      children: []
    }]
  }];

  constructor() { }

  ngOnInit() {
  }
}
