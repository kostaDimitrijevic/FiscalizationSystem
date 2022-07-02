import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInfoPageComponent } from './additional-info-page.component';

describe('AdditionalInfoPageComponent', () => {
  let component: AdditionalInfoPageComponent;
  let fixture: ComponentFixture<AdditionalInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
