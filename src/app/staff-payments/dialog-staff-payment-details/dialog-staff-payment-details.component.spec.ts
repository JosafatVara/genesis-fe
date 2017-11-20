import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStaffPaymentDetailsComponent } from './dialog-staff-payment-details.component';

describe('DialogPaymentDetailsComponent', () => {
  let component: DialogStaffPaymentDetailsComponent;
  let fixture: ComponentFixture<DialogStaffPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStaffPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStaffPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
