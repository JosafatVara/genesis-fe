import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStaffDetailsComponent } from './dialog-staff-details.component';

describe('DialogStaffDetailsComponent', () => {
  let component: DialogStaffDetailsComponent;
  let fixture: ComponentFixture<DialogStaffDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStaffDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
