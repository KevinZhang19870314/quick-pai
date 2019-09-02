import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  isChecked1: boolean = false;
  isChecked2: boolean = true;
  isChecked3: boolean = true;
  isChecked4: boolean = true;
  isChecked5: boolean = true;
  isChecked6: boolean = true;
  isChecked7: boolean = false;
  isDisabled: boolean = true;

  public testForm: FormGroup;

  get f() { return this.testForm.controls; }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.testForm = this.fb.group({
      isChecked7: [false, []],
      isChecked8: [true, []],
      isChecked9: [true, []]
    })
  }

  onCheckChanged(checked) {
    this.isChecked4 = !this.isChecked4;
    this.isChecked5 = !this.isChecked5;
    this.isChecked6 = !this.isChecked6;
  }

  onCheckValues() {
    let result = 'binding 1 = ' + this.f.isChecked7.value + '\r\n' +
      'binding 2 = ' + this.f.isChecked8.value + '\r\n' +
      'binding 3 = ' + this.f.isChecked9.value;
    alert(result);
  }

  onToggleBindingsValue() {
    this.testForm.patchValue({ isChecked7: !this.f.isChecked7.value });
    this.testForm.patchValue({ isChecked8: !this.f.isChecked8.value });
    this.testForm.patchValue({ isChecked9: !this.f.isChecked9.value });
  }
}
