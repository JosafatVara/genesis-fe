import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPaymentsComponent } from './staff-payments.component';

describe('StaffPaymentsComponent', () => {
  let component: StaffPaymentsComponent;
  let fixture: ComponentFixture<StaffPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
