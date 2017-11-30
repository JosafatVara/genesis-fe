import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPaymentDetailsComponent } from './provider-payment-details.component';

describe('ProviderPaymentDetailsComponent', () => {
  let component: ProviderPaymentDetailsComponent;
  let fixture: ComponentFixture<ProviderPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
