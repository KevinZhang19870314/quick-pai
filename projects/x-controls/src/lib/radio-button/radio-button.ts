import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewEncapsulation, Inject, Directive, ContentChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Utils } from '../common/utils';

@Component({
  selector: `x-radio-button`,
  templateUrl: 'radio-button.html',
  styleUrls: ['radio-button.scss'],
  encapsulation: ViewEncapsulation.None
})
export class XRadioButton implements OnInit {

  @Input() xValue: any;
  @Input() xDisabled: boolean = false;

  xLabelPosition: 'after' | 'before' = 'after';
  xColor: 'primary' | 'accent' | 'warn' = 'primary';
  xChecked: boolean = false;

  constructor(@Inject(forwardRef(() => XRadioButtonGroup)) private radioButtonGroup: XRadioButtonGroup) {
    if (!this.radioButtonGroup) {
      throw Error('radio button control must be included in radio button group');
    }
  }

  ngOnInit(): void {
    // Avoid to pass in a 'true' or 'false' string value
    this.xDisabled = (<any>this.xDisabled === 'true');
  }

  ngOnChanges() {

  }

  onChanged(event: Event) {
    event.stopPropagation();

    if (this.xDisabled) {
      return;
    }

    this.radioButtonGroup.onValueChanged.next({ checked: this.xChecked, value: this.xValue });
    this.radioButtonGroup.toggleRadios(this.xValue);
  }

  onClicked(event: Event) {
    // If current radio button is in checked state, prevent click itself to unchecked
    if (this.xChecked) {
      event.preventDefault();
    }
  }
}

@Directive({
  selector: `x-radio-button-group`,
  host: {
    'class': 'x-radio-button-group',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => XRadioButtonGroup),
      multi: true,
    }]
})
export class XRadioButtonGroup implements OnInit, ControlValueAccessor {
  private emitChange = (_: any) => { };

  @Input() xColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() xValue: any;
  @Input() xDisabled: boolean = false;
  @Input() xLabelPosition: 'after' | 'before' = 'after';

  @Output() onValueChanged = new EventEmitter<any>();

  // Child radio buttons.
  @ContentChildren(forwardRef(() => XRadioButton), { descendants: true })
  radios: QueryList<XRadioButton>;

  constructor(private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.toggleRadios(this.xValue);
  }

  toggleRadios(currentVal: any) {
    this.xValue = currentVal;

    if (this.emitChange) {
      this.emitChange(this.xValue);
    }

    if (this.radios) {
      this.radios.forEach(radio => {
        radio.xColor = this.xColor;
        radio.xDisabled = this.xDisabled || radio.xDisabled;
        radio.xLabelPosition = this.xLabelPosition;
        if (typeof radio.xValue === 'string' || typeof radio.xValue === 'number') {
          radio.xChecked = currentVal + '' === radio.xValue + '';
        }

        if (typeof radio.xValue === 'object') {
          radio.xChecked = Utils.objEqual(currentVal, radio.xValue);
        }

        this.cdf.detectChanges();
      });
    }
  }

  ngOnChanges() {

  }

  writeValue(selected: any): void {
    if (typeof selected === 'string' || typeof selected === 'object') {
      this.xValue = selected;
      this.toggleRadios(this.xValue);
    }
  }

  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  registerOnTouched(fn: any): void { }
}

