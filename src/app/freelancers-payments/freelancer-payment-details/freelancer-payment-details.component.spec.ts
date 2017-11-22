import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerPaymentDetailsComponent } from './freelancer-payment-details.component';

describe('FreelancerPaymentDetailsComponent', () => {
  let component: FreelancerPaymentDetailsComponent;
  let fixture: ComponentFixture<FreelancerPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancerPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
