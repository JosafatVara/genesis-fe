import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancersPaymentsComponent } from './freelancers-payments.component';

describe('FreelancersPaymentsComponent', () => {
  let component: FreelancersPaymentsComponent;
  let fixture: ComponentFixture<FreelancersPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancersPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancersPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
