import { Component, ViewEncapsulation, OnInit, Input, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Utils } from '../common/utils';

@Component({
  selector: `x-button`,
  templateUrl: 'button.html',
  styleUrls: ['button.scss'],
  encapsulation: ViewEncapsulation.None
})

export class XButton implements OnInit {

  @Input() xSize: 'normal' | 'large' | 'small' | any = 'normal';
  @Input() xColor: 'primary' | 'accent' | 'warn' | any = 'primary';

  buttonWrapperEl: any;

  constructor(private renderer2: Renderer2,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.buttonWrapperEl = this.el.nativeElement.getElementsByClassName('x-button-wrapper')[0];

    this.buildSize();
    this.buildBgColor();
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
    if (this.xColor !== 'primary' && this.xColor !== 'accent' && this.xColor !== 'warn') {
      this.renderer2.setStyle(this.buttonWrapperEl, 'background-color', this.xColor);
    }
  }

  // For those colors which isn't in primary/accent/warn mouseover implementation 
  @HostListener('mouseover') onmouseover() {
    if (this.xColor !== 'primary' && this.xColor !== 'accent' && this.xColor !== 'warn') {
      let rgb = Utils.hexToRgb(this.xColor);
      this.renderer2.setStyle(this.buttonWrapperEl, 'background-color', 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 80%)');
    }
  }

  // For those colors which isn't in primary/accent/warn mouseout implementation 
  @HostListener('mouseout') onmouseout() {
    if (this.xColor !== 'primary' && this.xColor !== 'accent' && this.xColor !== 'warn') {
      this.renderer2.setStyle(this.buttonWrapperEl, 'background-color', this.xColor);
    }
  }
}


