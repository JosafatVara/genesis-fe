import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPaymentListComponent } from './staff-payment-list.component';

describe('PaymentListComponent', () => {
  let component: StaffPaymentListComponent;
  let fixture: ComponentFixture<StaffPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
