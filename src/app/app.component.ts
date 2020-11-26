import { Component } from '@angular/core';
import { XSideNavItem } from 'projects/x-controls/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quick-pai';

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
    expanded: true,
    children: [{
      id: 'wFpY',
      displayName: '按钮',
      route: 'button',
      highlightRoutes: ['button'],
      children: []
    }, {
      id: 't1uI',
      displayName: '多选框',
      route: 'checkbox',
      highlightRoutes: ['checkbox'],
      children: []
    }, {
      id: 'R3A6',
      displayName: '下拉框',
      route: 'dropdown',
      highlightRoutes: ['dropdown'],
      children: []
    }, {
      id: 'jG19',
      displayName: '输入框',
      route: 'input',
      highlightRoutes: ['input'],
      children: []
    }, {
      id: 'qHVL',
      displayName: '单选按钮',
      route: 'radio-button',
      highlightRoutes: ['radio-button'],
      children: []
    }, {
      id: 'fbpS',
      displayName: '侧边菜单',
      route: 'sidenav',
      highlightRoutes: ['sidenav'],
      children: []
    }, {
      id: 'GYdw',
      displayName: '标签页',
      route: 'tabs',
      highlightRoutes: ['tabs'],
      children: []
    }, {
      id: 'YMmc',
      displayName: '提示弹出框',
      route: 'tooltip',
      highlightRoutes: ['tooltip'],
      children: []
    }]
  }];
}
