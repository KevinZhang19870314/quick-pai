import { Component, OnInit, Renderer2, ElementRef, SimpleChanges, Input, Output, EventEmitter, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { rectangle, svgNode, line } from '../common/wired-lib';
import { XControl, Point } from '../common/control';

@Component({
  selector: `x-checkbox`,
  templateUrl: 'checkbox.html',
  styleUrls: ['checkbox.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => XCheckbox),
      multi: true,
    }]
})

export class XCheckbox extends XControl implements OnInit, ControlValueAccessor {
  private emitChange = (_: any) => { };

  @Input() xColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() xChecked: boolean = false;
  @Input() xDisabled: boolean = false;
  @Input() xLabelPosition: 'after' | 'before' = 'after';

  @Output() onCheckChanged = new EventEmitter<boolean>();

  private svgCheck?: SVGElement;
  @ViewChild('svg', { static: true }) svg: ElementRef<SVGElement>;

  constructor(private el: ElementRef) { super(el); }

  ngOnInit(): void {
    // Avoid to pass in a 'true' or 'false' string value
    this.xChecked = (<any>this.xChecked === 'true');
  }

  ngOnChanges() {

  }

  ngAfterViewInit() {
    this.render();
  }

  protected canvasSize(): Point {
    return [19, 19];
  }

  protected draw(svg: SVGElement, size: Point) {
    rectangle(this.svg.nativeElement, 0, 0, size[0], size[1], this.seed);
    this.svgCheck = svgNode('g');
    this.svg.nativeElement.appendChild(this.svgCheck);
    line(this.svgCheck, size[0] * 0.3, size[1] * 0.4, size[0] * 0.5, size[1] * 0.7, this.seed);
    line(this.svgCheck, size[0] * 0.5, size[1] * 0.7, size[0] + 5, -5, this.seed);

    this.refreshCheckVisibility();
  }

  private refreshCheckVisibility() {
    if (this.svgCheck) {
      this.svgCheck.style.display = this.xChecked ? '' : 'none';
    }
  }

  onChanged() {
    if (this.xDisabled) {
      return;
    }

    // For reactive forms supporting
    this.emitChange(this.xChecked);

    this.onCheckChanged.next(this.xChecked);

    this.refreshCheckVisibility();
  }

  writeValue(checked: any): void {
    if (typeof checked === 'boolean') {
      this.xChecked = checked;
    } else {
      this.xChecked = false;
    }

    this.refreshCheckVisibility();
  }

  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  registerOnTouched(fn: any): void { }
}


