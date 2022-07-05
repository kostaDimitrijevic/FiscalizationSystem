import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdererComponent } from './orderer.component';

describe('OrdererComponent', () => {
  let component: OrdererComponent;
  let fixture: ComponentFixture<OrdererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
