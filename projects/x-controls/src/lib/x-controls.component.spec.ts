import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XControlsComponent } from './x-controls.component';

describe('XControlsComponent', () => {
  let component: XControlsComponent;
  let fixture: ComponentFixture<XControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
