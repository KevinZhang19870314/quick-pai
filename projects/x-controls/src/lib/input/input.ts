import { Component, OnInit, Renderer2, ElementRef, SimpleChanges, Input, Output, EventEmitter, forwardRef, OnChanges, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Utils } from '../common/utils';

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

export class XInput implements OnInit, OnChanges, ControlValueAccessor {
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

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

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
}


