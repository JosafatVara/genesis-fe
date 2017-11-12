import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEnterpriseToManageComponent } from './select-enterprise-to-manage.component';

describe('SelectEnterpriseToManageComponent', () => {
  let component: SelectEnterpriseToManageComponent;
  let fixture: ComponentFixture<SelectEnterpriseToManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectEnterpriseToManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEnterpriseToManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
