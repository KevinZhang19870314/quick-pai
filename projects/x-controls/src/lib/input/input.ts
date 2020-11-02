import { Component, OnInit, Renderer2, ElementRef, SimpleChanges, Input, Output, EventEmitter, forwardRef, OnChanges, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Utils } from '../common/utils';
import { XControl, Point } from '../common/control';
import { rectangle, line } from '../common/wired-lib';

@Component({
  selector: `x-input`,
  templateUrl: 'input.html',
  styleUrls: ['input.scss'],
  host: {
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => XInput),
      multi: true,
    }]
})

export class XInput extends XControl implements OnInit, OnChanges, ControlValueAccessor {

  private emitChange = (_: any) => { };
  uid = Utils.ID();

  @Input() xLblText: string;
  @Input() xValue: string;
  @Input() xMsg: string;
  @Input() xPlaceholder: string = '';

  _disabled: boolean = false;
  @Input()
  get xDisabled(): boolean {
    return this._disabled;
  }
  set xDisabled(value: boolean) {
    this._disabled = Utils.toBoolean(value);
  }

  @Output() onValueChanged = new EventEmitter<any>();

  @ViewChild('inputContainer') inputContainer: ElementRef<HTMLElement>;

  constructor(private el: ElementRef) { super(el); }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngAfterViewInit() {
    this.render();
  }

  onChanged() {
    this.emitChange(this.xValue);

    this.onValueChanged.next(this.xValue);
  }

  writeValue(val: any): void {
    if (val !== null) {
      this.xValue = val;
    }
  }

  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  registerOnTouched(fn: any): void { }

  protected canvasSize(): Point {
    const size = {
      width: +this.inputContainer.nativeElement.offsetWidth,
      height: +this.inputContainer.nativeElement.offsetHeight,
    };

    return [size.width, size.height];
  }
  
  protected draw(svg: SVGElement, size: Point): void {
    // rectangle(svg, 2, 2, size[0] - 2, size[1] - 2, this.seed);
    line(svg, 0, size[1] - 2, size[0], size[1] - 2, this.seed);
  }
}


