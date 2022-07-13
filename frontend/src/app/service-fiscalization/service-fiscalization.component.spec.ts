import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFiscalizationComponent } from './service-fiscalization.component';

describe('ServiceFiscalizationComponent', () => {
  let component: ServiceFiscalizationComponent;
  let fixture: ComponentFixture<ServiceFiscalizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceFiscalizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceFiscalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
