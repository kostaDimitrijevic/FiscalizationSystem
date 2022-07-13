import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalizationComponent } from './fiscalization.component';

describe('FiscalizationComponent', () => {
  let component: FiscalizationComponent;
  let fixture: ComponentFixture<FiscalizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
