import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProviderPaymentDetailsComponent } from './dialog-provider-payment-details.component';

describe('DialogProviderPaymentDetailsComponent', () => {
  let component: DialogProviderPaymentDetailsComponent;
  let fixture: ComponentFixture<DialogProviderPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProviderPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProviderPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
