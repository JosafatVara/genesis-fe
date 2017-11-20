import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFreelancerPaymentDetailsComponent } from './dialog-freelancer-payment-details.component';

describe('DialogFreelancerPaymentDetailsComponent', () => {
  let component: DialogFreelancerPaymentDetailsComponent;
  let fixture: ComponentFixture<DialogFreelancerPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFreelancerPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFreelancerPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
