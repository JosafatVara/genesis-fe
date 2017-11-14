import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPaymentDetailsComponent } from './staff-payment-details.component';

describe('PaymentDetailsComponent', () => {
  let component: StaffPaymentDetailsComponent;
  let fixture: ComponentFixture<StaffPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
