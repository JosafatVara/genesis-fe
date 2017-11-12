import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentDetailsComponent } from './dialog-payment-details.component';

describe('DialogPaymentDetailsComponent', () => {
  let component: DialogPaymentDetailsComponent;
  let fixture: ComponentFixture<DialogPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
