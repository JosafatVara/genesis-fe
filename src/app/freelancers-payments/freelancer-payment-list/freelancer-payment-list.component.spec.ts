import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerPaymentListComponent } from './freelancer-payment-list.component';

describe('FreelancerPaymentListComponent', () => {
  let component: FreelancerPaymentListComponent;
  let fixture: ComponentFixture<FreelancerPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancerPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
