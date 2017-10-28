import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesProductsComponent } from './purchases-products.component';

describe('PurchasesProductsComponent', () => {
  let component: PurchasesProductsComponent;
  let fixture: ComponentFixture<PurchasesProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
