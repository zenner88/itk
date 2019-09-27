import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { formComponent } from './form.component';

describe('formComponent', () => {
  let component: formComponent;
  let fixture: ComponentFixture<formComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
