import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  disabledBtn: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  onPrimaryBtnClicked() {
    this.disabledBtn = !this.disabledBtn;
    alert('Primary btn clicked');
  }
}
