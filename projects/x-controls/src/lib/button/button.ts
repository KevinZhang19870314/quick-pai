import { Component, OnInit, Input, Renderer2, ElementRef, HostListener, SimpleChanges, ViewChild } from '@angular/core';
import { Utils } from '../common/utils';
import rough from 'roughjs';
import { rectangle } from '../common/wired-lib';
import { XControl, Point } from '../common/control';

/**
 * Example of usage:
 * <example-url>https://stackblitz.com/edit/x-button?embed=1&file=src/app/app.component.ts</example-url>
 * <example-url>https://www.baidu.com</example-url>
 */
@Component({
  selector: `x-button`,
  templateUrl: 'button.html',
  styleUrls: ['button.scss'],
  host: {
    '[class.disabled]': 'xDisabled === "true" || xDisabled === true'
  }
})

export class XButton extends XControl implements OnInit {

  /**按钮大小 */
  @Input() xSize: 'normal' | 'large' | 'small' | any = 'normal';

  /**按钮颜色，可以是主、副、警告色. */
  @Input() xColor: 'primary' | 'accent' | 'warn' = 'primary';

  /**是否禁用 */
  @Input() xDisabled: any = false;

  private readonly elevation = 1;

  @ViewChild('svg', { static: true }) svg: ElementRef<SVGElement>;

  buttonWrapperEl: HTMLElement;

  constructor(private renderer2: Renderer2,
    private el: ElementRef) {
    super(el);
  }

  ngOnInit(): void {
    this.buttonWrapperEl = this.el.nativeElement.getElementsByClassName('x-button-wrapper')[0];

    this.buildSize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.buttonWrapperEl) {
      this.buttonWrapperEl = this.el.nativeElement.getElementsByClassName('x-button-wrapper')[0];
    }
  }

  ngAfterViewInit() {
    this.render();
  }

  protected canvasSize(): Point {
    if (!this.buttonWrapperEl) {
      return this.lastSize;
    }

    const elev = Math.min(Math.max(1, this.elevation), 5);
    const size = {
      width: +this.buttonWrapperEl.offsetWidth + ((elev - 1) * 2),
      height: +this.buttonWrapperEl.offsetHeight + ((elev - 1) * 2),
    };

    return [size.width, size.height];
  }

  protected draw() {
    const elev = Math.min(Math.max(1, this.elevation), 5);

    const s = {
      width: +this.buttonWrapperEl.offsetWidth - ((elev - 1) * 2),
      height: +this.buttonWrapperEl.offsetHeight - ((elev - 1) * 2),
    };

    rectangle(this.svg.nativeElement, 0, 0, s.width, s.height, this.seed);
  }

  private buildSize() {
    if (this.xSize === 'normal') {
      this.renderer2.setStyle(this.buttonWrapperEl, 'width', '108px');
    } else if (this.xSize === 'large') {
      this.renderer2.setStyle(this.buttonWrapperEl, 'width', '208px');
    } else if (this.xSize === 'small') {
      this.renderer2.setStyle(this.buttonWrapperEl, 'width', '68px');
    } else {
      this.renderer2.setStyle(this.buttonWrapperEl, 'width', this.xSize);
    }
  }
}


