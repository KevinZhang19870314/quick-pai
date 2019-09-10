import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  val1: string = '张三丰';
  val2: string;
  val3: string = '其他';

  public testForm: FormGroup;
  formResult: string;

  get f() { return this.testForm.controls; }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.testForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(10)]],
      height: [170, Validators.max(300)]
    })
  }

  onValueChanged(val: any) {
    console.log(val);
  }

  onFormSubmit() {
    if(this.testForm.invalid) {
      this.formResult = 'form字段验证不通过';
    } else {
      this.formResult = JSON.stringify(this.testForm.value);
    }
  }
}
