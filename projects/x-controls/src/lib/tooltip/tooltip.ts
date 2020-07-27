import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit, TemplateRef, Component, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { trigger, transition, style, animate } from "@angular/animations";

const OFFSET = 4;

@Directive({
  selector: '[xTooltip]'
})
export class XTooltipDirective implements OnInit {

  @Input('xTooltip') xText = '';
  @Input() xTemplate: TemplateRef<any>;
  @Input() xPosition: 'top' | 'right' | 'bottom' | 'left' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'right';
  @Input() xBgColor: string = 'rgba(73, 89, 106, .7)';
  @Input() xOffsetX: number = null;
  @Input() xOffsetY: number = null;
  @Input() xShowArrow: boolean = true;


  private overlayRef: OverlayRef;
  private withPositions: any = {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: OFFSET,
    offsetY: 0
  };

  constructor(private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.initWithPositions();

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([this.withPositions]);

    this.overlayRef = this.overlay.create({ positionStrategy, hasBackdrop: false });
  }

  private initWithPositions() {
    switch (this.xPosition) {
      case 'top':
        this.withPositions = {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetX: this.xOffsetX === null ? 0 : this.xOffsetX,
          offsetY: this.xOffsetY === null ? -2 * OFFSET : this.xOffsetY
        };
        break;
      case 'right':
        this.withPositions = {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: this.xOffsetX === null ? 2 * OFFSET : this.xOffsetX,
          offsetY: this.xOffsetY === null ? 0 : this.xOffsetY
        };
        break;
      case 'bottom':
        this.withPositions = {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetX: this.xOffsetX === null ? 0 : this.xOffsetX,
          offsetY: this.xOffsetY === null ? 2 * OFFSET : this.xOffsetY
        };
        break;
      case 'left':
        this.withPositions = {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: this.xOffsetX === null ? -2 * OFFSET : this.xOffsetX,
          offsetY: this.xOffsetY === null ? 0 : this.xOffsetY
        };
        break;
      case 'topLeft':
        this.withPositions = {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetX: this.xOffsetX === null ? OFFSET : this.xOffsetX,
          offsetY: this.xOffsetY === null ? -2 * OFFSET : this.xOffsetY
        };
        break;
      case 'topRight':
        this.withPositions = {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetX: this.xOffsetX === null ? -OFFSET : this.xOffsetX,
          offsetY: this.xOffsetY === null ? -2 * OFFSET : this.xOffsetY
        };
        break;
      case 'bottomLeft':
        this.withPositions = {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: this.xOffsetX === null ? OFFSET : this.xOffsetX,
          offsetY: this.xOffsetY === null ? 2 * OFFSET : this.xOffsetY
        };
        break;
      case 'bottomRight':
        this.withPositions = {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: this.xOffsetX === null ? -OFFSET : this.xOffsetX,
          offsetY: this.xOffsetY === null ? 2 * OFFSET : this.xOffsetY
        };
        break;
      default:
        break;
    }

    if (this.xPosition === 'top') {
      this.elementRef.nativeElement.classList.add('arrow-bottom');
    }
  }

  private buildArrow() {
    if (!this.overlayRef || !this.overlayRef.hostElement) {
      return;
    }

    let arrowPosition: string;
    switch (this.xPosition) {
      case 'top':
        arrowPosition = 'arrow-bottom'
        break;
      case 'right':
        arrowPosition = 'arrow-left'
        break;
      case 'bottom':
        arrowPosition = 'arrow-top'
        break;
      case 'left':
        arrowPosition = 'arrow-right'
        break;
      case 'topLeft':
        arrowPosition = 'arrow-bottomRight'
        break;
      case 'topRight':
        arrowPosition = 'arrow-bottomLeft'
        break;
      case 'bottomLeft':
        arrowPosition = 'arrow-topRight'
        break;
      case 'bottomRight':
        arrowPosition = 'arrow-topLeft'
        break;

      default:
        break;
    }
    let tooltipTag = this.overlayRef.hostElement.getElementsByTagName('x-tooltip')[0];
    if (tooltipTag) {
      tooltipTag.classList.add(arrowPosition);
    }
  }

  @HostListener('mouseenter')
  show() {
    if (this.overlayRef.hasAttached()) {
      return;
    }

    const tooltipRef: ComponentRef<XTooltipComponent>
      = this.overlayRef.attach(new ComponentPortal(XTooltipComponent));
    if (this.xText) {
      tooltipRef.instance.xText = this.xText;
    }

    if (this.xTemplate) {
      tooltipRef.instance.xTemplate = this.xTemplate;
    }

    tooltipRef.instance.xBgColor = this.xBgColor;

    if (this.xShowArrow) {
      this.buildArrow();
    }
  }

  @HostListener('mouseout')
  hide() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}

@Component({
  selector: `x-tooltip`,
  templateUrl: 'tooltip.component.html',
  styleUrls: ['tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class XTooltipComponent implements OnInit, OnChanges {

  @Input() xText = '';
  @Input() xTemplate: TemplateRef<any>;
  @Input() xBgColor = '';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}