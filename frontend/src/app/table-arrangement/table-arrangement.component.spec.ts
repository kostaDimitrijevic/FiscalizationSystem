import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableArrangementComponent } from './table-arrangement.component';

describe('TableArrangementComponent', () => {
  let component: TableArrangementComponent;
  let fixture: ComponentFixture<TableArrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableArrangementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableArrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
