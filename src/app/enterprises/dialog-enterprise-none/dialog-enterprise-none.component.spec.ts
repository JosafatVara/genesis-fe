import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEnterpriseNoneComponent } from './dialog-enterprise-none.component';

describe('DialogEnterpriseNoneComponent', () => {
  let component: DialogEnterpriseNoneComponent;
  let fixture: ComponentFixture<DialogEnterpriseNoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEnterpriseNoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEnterpriseNoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
