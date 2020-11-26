import { Component, OnInit, Input, Renderer2, ElementRef, HostListener, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Utils } from '../common/utils';
import rough from 'roughjs';
import { rectangle } from '../common/wired-lib';
import { XControl, Point } from '../common/control';
import { Route, Router } from '@angular/router';

/**
 * 侧边菜单，最多支持3层菜单展示 （PS：大部分产品项目侧边菜单层级3层及以下，超过3层已属于产品设计问题）
 * 
 * Example of usage:
 * <example-url>https://stackblitz.com/edit/x-button?embed=1&file=src/app/app.component.ts</example-url>
 */
@Component({
  selector: `x-sidenav`,
  templateUrl: 'sidenav.html',
  styleUrls: ['sidenav.scss'],
  encapsulation: ViewEncapsulation.None
})

export class XSideNav extends XControl implements OnInit {

  @Input() items: XSideNavItem[] = [];


  constructor(private renderer2: Renderer2,
    private el: ElementRef,
    private router: Router) {
    super(el);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngAfterViewInit() {
    this.render();
  }

  onItemClicked(item: XSideNavItem) {
    item.expanded = !item.expanded;
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  protected canvasSize(): Point {


    return [0, 0];
  }

  protected draw() {

  }
}

export interface XSideNavItem {
  /**唯一id标识 */
  id: string | number;
  /**菜单名称 */
  displayName: string;
  /**菜单fa icon， */
  iconName?: string;
  /**菜单跳转路由 */
  route?: string;
  /**需要高亮的路由数组，包含在此数组中的路由都会高亮当前route */
  highlightRoutes?: string[];
  /**子菜单数组 */
  children?: XSideNavItem[];
  /**是否展开当前菜单 */
  expanded?: boolean;
}

