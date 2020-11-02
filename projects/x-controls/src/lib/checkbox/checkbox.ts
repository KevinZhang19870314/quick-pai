import { Component, OnInit, Renderer2, ElementRef, SimpleChanges, Input, Output, EventEmitter, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { rectangle, Seed, svgNode, line } from '../common/wired-lib';

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

export class XCheckbox implements OnInit, ControlValueAccessor {
  private emitChange = (_: any) => { };

  @Input() xColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() xChecked: boolean = false;
  @Input() xDisabled: boolean = false;
  @Input() xLabelPosition: 'after' | 'before' = 'after';

  @Output() onCheckChanged = new EventEmitter<boolean>();

  private svgCheck?: SVGElement;
  @ViewChild('svg', { static: true }) svg: ElementRef<SVGElement>;

  constructor() { }

  ngOnInit(): void {
    // Avoid to pass in a 'true' or 'false' string value
    this.xChecked = (<any>this.xChecked === 'true');
  }

  ngOnChanges() {

  }

  ngAfterViewInit() {
    this.draw();
  }

  private draw() {
    if (this.svg) {

      const s = {
        width: 19,
        height: 19,
      };

      while (this.svg.nativeElement.hasChildNodes()) {
        this.svg.nativeElement.removeChild(this.svg.nativeElement.lastChild!);
      }

      this.svg.nativeElement.setAttribute('width', `${s.width}`);
      this.svg.nativeElement.setAttribute('height', `${s.height}`);
      rectangle(this.svg.nativeElement, 0, 0, s.width, s.height, Seed);
      this.svgCheck = svgNode('g');
      this.svg.nativeElement.appendChild(this.svgCheck);
      line(this.svgCheck, s.width * 0.3, s.height * 0.4, s.width * 0.5, s.height * 0.7, Seed);
      line(this.svgCheck, s.width * 0.5, s.height * 0.7, s.width + 5, -5, Seed);

      this.refreshCheckVisibility();
    }
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


