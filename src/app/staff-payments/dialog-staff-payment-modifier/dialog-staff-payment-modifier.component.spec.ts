import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStaffPaymentModifierComponent } from './dialog-staff-payment-modifier.component';

describe('DialogStaffPaymentModifierComponent', () => {
  let component: DialogStaffPaymentModifierComponent;
  let fixture: ComponentFixture<DialogStaffPaymentModifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStaffPaymentModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStaffPaymentModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
