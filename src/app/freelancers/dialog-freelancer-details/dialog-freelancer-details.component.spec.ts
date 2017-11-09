import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFreelancerDetailsComponent } from './dialog-freelancer-details.component';

describe('DialogFreelancerDetailsComponent', () => {
  let component: DialogFreelancerDetailsComponent;
  let fixture: ComponentFixture<DialogFreelancerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFreelancerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFreelancerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
