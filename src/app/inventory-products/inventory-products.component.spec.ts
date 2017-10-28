import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryProductsComponent } from './inventory-products.component';

describe('InventoryProductsComponent', () => {
  let component: InventoryProductsComponent;
  let fixture: ComponentFixture<InventoryProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
