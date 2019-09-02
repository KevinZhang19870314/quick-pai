import { Component, OnInit, Input, Renderer2, ElementRef, HostListener, SimpleChanges } from '@angular/core';
import { Utils } from '../common/utils';

@Component({
  selector: `x-button`,
  templateUrl: 'button.html',
  styleUrls: ['button.scss'],
  host: {
    '[class.disabled]': 'xDisabled === "true" || xDisabled === true'
  }
})

export class XButton implements OnInit {

  @Input() xSize: 'normal' | 'large' | 'small' | any = 'normal';
  @Input() xColor: 'primary' | 'accent' | 'warn' | any = 'primary';
  @Input() xDisabled: boolean = false;

  buttonWrapperEl: HTMLElement;

  constructor(private renderer2: Renderer2,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.buttonWrapperEl = this.el.nativeElement.getElementsByClassName('x-button-wrapper')[0];

    this.buildSize();
    this.buildBgColor();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.buttonWrapperEl) {
      this.buttonWrapperEl = this.el.nativeElement.getElementsByClassName('x-button-wrapper')[0];
    }

    if (changes && changes.xDisabled !== undefined && this.buttonWrapperEl) {
      this.buildBgColor();
    }
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

  private buildBgColor() {
    if (this.xDisabled) {
      this.renderer2.setStyle(this.buttonWrapperEl, 'background-color', '#B0B0B0');
      return;
    }

    if (this.xColor !== 'primary' && this.xColor !== 'accent' && this.xColor !== 'warn') {
      this.renderer2.setStyle(this.buttonWrapperEl, 'background-color', this.xColor);
    } else {
      this.renderer2.setStyle(this.buttonWrapperEl, 'background-color', '');
    }
  }

  // mouseover implementation for those colors which isn't in primary/accent/warn 
  @HostListener('mouseover') onmouseover() {
    if (this.xDisabled) {
      return;
    }

    if (this.xColor !== 'primary' && this.xColor !== 'accent' && this.xColor !== 'warn') {
      let rgb = Utils.hexToRgb(this.xColor);
      this.renderer2.setStyle(this.buttonWrapperEl, 'background-color', 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 80%)');
    }
  }

  // mouseout implementation for those colors which isn't in primary/accent/warn
  @HostListener('mouseout') onmouseout() {
    if (this.xDisabled) {
      return;
    }

    if (this.xColor !== 'primary' && this.xColor !== 'accent' && this.xColor !== 'warn') {
      this.renderer2.setStyle(this.buttonWrapperEl, 'background-color', this.xColor);
    }
  }
}


