import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEnterpriseDetailsComponent } from './dialog-enterprise-details.component';

describe('DialogEnterpriseDetailsComponent', () => {
  let component: DialogEnterpriseDetailsComponent;
  let fixture: ComponentFixture<DialogEnterpriseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEnterpriseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEnterpriseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
