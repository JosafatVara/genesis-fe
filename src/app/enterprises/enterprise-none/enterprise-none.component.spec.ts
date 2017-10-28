import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseNoneComponent } from './enterprise-none.component';

describe('EnterpriseNoneComponent', () => {
  let component: EnterpriseNoneComponent;
  let fixture: ComponentFixture<EnterpriseNoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseNoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseNoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
