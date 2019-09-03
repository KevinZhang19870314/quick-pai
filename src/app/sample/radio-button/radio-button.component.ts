import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

  chooseTShirt = 't-shirt';
  choosePants = 'pants';
  chooseShoes = 'shoes';

  public testForm: FormGroup;
  get f() { return this.testForm.controls; }

  seasons = [
    { id: 1, name: 'spring' },
    { id: 2, name: 'summer' },
    { id: 3, name: 'autumn' },
    { id: 4, name: 'winter' }
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.testForm = this.fb.group({
      selectedPhone: ['Nokia N97', []]
    })
  }

  onChooseShoes1() {
    this.chooseTShirt = 'shoes';
  }

  onChooseShoes2() {
    this.choosePants = 'shoes';
  }

  onChooseHuaWeiP10() {
    this.testForm.patchValue({ selectedPhone: 'HuaWei P10' });
  }

  onValueChanged($event) {
    console.log(JSON.stringify($event));
    this.chooseTShirt = $event.value;
  }
}
