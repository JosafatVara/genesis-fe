import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPaymentListComponent } from './provider-payment-list.component';

describe('ProviderPaymentListComponent', () => {
  let component: ProviderPaymentListComponent;
  let fixture: ComponentFixture<ProviderPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
