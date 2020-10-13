import { Component, OnInit, Renderer2, ElementRef, SimpleChanges, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
    // Avoid to pass in a 'true' or 'false' string value
    this.xChecked = (<any>this.xChecked === 'true');
  }

  ngOnChanges() {

  }

  onChanged() {
    if (this.xDisabled) {
      return;
    }

    // For reactive forms supporting
    this.emitChange(this.xChecked);

    this.onCheckChanged.next(this.xChecked);
  }

  writeValue(checked: any): void {
    if (typeof checked === 'boolean') {
      this.xChecked = checked;
    } else {
      this.xChecked = false;
    }
  }

  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  registerOnTouched(fn: any): void { }
}


